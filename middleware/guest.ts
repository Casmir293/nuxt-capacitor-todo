import { Capacitor } from "@capacitor/core";

export default defineNuxtRouteMiddleware(async () => {
  const authUser = authStore();
  const auth = useCookie("auth").value;

  if (Capacitor.isNativePlatform()) {
    const session = await checkSession();
    if (authUser.value && session) {
      return navigateTo(`/`);
    }
    return;
  }

  if (authUser.value || auth) {
    return navigateTo(`/`);
  }
});
