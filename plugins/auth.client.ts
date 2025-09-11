export default defineNuxtPlugin(async (nuxtApp) => {
  const { $supabase } = useNuxtApp();
  const { signout } = useAuth();

  const user = authStore();

  await loadSession();

  const { data } = await $supabase.auth.getUser();
  user.value = data.user;

  $supabase.auth.onAuthStateChange(async (event, session) => {
    user.value = session?.user || null;
    if (session?.user) {
      user.value = session.user;
    } else {
      await signout();
    }
  });
});
