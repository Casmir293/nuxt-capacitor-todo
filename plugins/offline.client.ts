import { Network } from "@capacitor/network";

export default defineNuxtPlugin(async (nuxtApp) => {
  const isOnline = offlineStore();

  const status = await Network.getStatus();
  isOnline.value = status.connected;

  Network.addListener("networkStatusChange", (status) => {
    isOnline.value = status.connected;
    logger("Network changed:", status);
  });
});
