export default defineNuxtRouteMiddleware(() => {
  const authUser = authStore();
  const auth = useCookie("auth").value;

  if (authUser.value || auth) {
    return navigateTo(`/`);
  }
});
