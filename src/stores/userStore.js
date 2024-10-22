import { watch } from "vue";
import { defineStore } from "pinia";
import { useQuery } from "@vue/apollo-composable";
import { authUserQuery } from "@/graphql/queries";
import { eraseCookie, setCookie } from "@/utils/cookie";



export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    name: null,
    email: null,
    role: null,
    phoneNumber: null,
    address: null,
    avatar: null,
    createdAt: null,
    isGoogleUser: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCurrentUser() {
      this.loading = true;
      this.error = null;

      // eslint-disable-next-line no-unused-vars
      const { result, loading, error, refetch } = useQuery(
        authUserQuery,
        null,
        {
          fetchPolicy: "network-only",
        }
      );

      watch(result, (data) => {
        if (data && data?.authUser) {
          this.setUser(data?.authUser);
        }
      });

      watch(loading, (isLoading) => {
        this.loading = isLoading;
      });

      watch(error, (err) => {
        if (err) {
          this.error = err?.message;
        }
      });
    },

    setUser(userData) {
      if (userData && userData?.user) {
        this.id = userData?.user?.id;
        this.name = userData?.user?.name;
        this.email = userData?.user?.email;
        this.role = userData?.user?.role;
        this.phoneNumber = userData?.user?.phone_number;
        this.address = userData?.user?.address;
        this.avatar =
          userData?.user?.avatar?.url || localStorage.getItem("avatar");
        this.isGoogleUser = userData?.user?.isGoogleUser;
        this.createdAt = userData?.user?.createdAt;
      }
      this.accessToken = userData?.accessToken;
      this.refreshToken = userData?.refreshToken;
    },

    clearUser() {
      this.$reset();
      eraseCookie("userData");
      eraseCookie("access_token");
      eraseCookie("refresh_token");
      localStorage.removeItem("activation_token");
      localStorage.removeItem("resetPasswordToken");
      localStorage.removeItem("avatar")
    },

    async refreshUser() {
      this.clearUser();
      const { refetch } = await this.fetchCurrentUser();
      await refetch();
    },

    persistData() {
      setCookie("userData", JSON.stringify(this.$state), 7);
    },

    restoreData() {
      const storedData = document.cookie.match(/userData=([^;]*)/);
      if (storedData) {
        this.$state = JSON.parse(storedData[1]);
      }
    },

    init() {
      this.restoreData();
    },
  },

  getters: {
    isAuthenticated: (state) => !!state?.accessToken,
    // isNotAdmin: (state) => !!state?.role,
  },
});