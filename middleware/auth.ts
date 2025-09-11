import { Capacitor } from "@capacitor/core";

export default defineNuxtRouteMiddleware(async () => {
  const authUser = authStore();
  const { signout } = useAuth();
  const auth = useCookie("auth").value;

  if (Capacitor.isNativePlatform()) {
    const session = await checkSession();
    if (!authUser.value && !session) {
      signout();
      return navigateTo(`/signin`);
    }
    return;
  }

  if (!authUser.value && !auth) {
    signout();
    return navigateTo(`/signin`);
  }
});
