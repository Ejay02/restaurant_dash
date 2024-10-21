import { ref, h, render } from "vue";
import Notification from "../components/alert.vue";

export function useNotifications() {
  const notifications = ref([]);

  const addNotification = (message, type = "info", duration = 3000) => {
    const vnode = h(Notification, { message, type, duration });
    const container = document.createElement("div");
    render(vnode, container);
    document.body.appendChild(container);

    notifications.value.push(container);

    setTimeout(() => {
      const index = notifications.value.indexOf(container);
      if (index > -1) {
        notifications.value.splice(index, 1);
        render(null, container);
        document.body.removeChild(container);
      }
    }, duration);
  };

  return {
    notify: addNotification,
  };
}