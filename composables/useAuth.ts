export default function useAuth() {
  const { $supabase } = useNuxtApp();

  const signup = async (payload: SignupPayload) => {
    try {
      const { data, error } = await $supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      });
      if (error) throw error;

      const user = data.user;
      if (!user) throw new Error("No user returned from signup");

      const { error: userError } = await $supabase.from("users").insert([
        {
          id: user.id,
          name: payload.name,
          email: payload.email,
        },
      ]);
      if (userError) throw userError;

      return data;
    } catch (err: any) {
      logger("Signup failed:", err);
      alert(err.message);
      return null;
    }
  };

  const signin = async (payload: SigninPayload) => {
    try {
      const { data, error } = await $supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
      if (error) throw error;
      if (data.session) await saveSession(data.session);
      return data;
    } catch (err: any) {
      logger("Signin failed:", err);
      alert(err.message);
      return null;
    }
  };

  const signout = async () => {
    try {
      navigateTo("/signin");
      useCookie("auth").value = null;
      const { error } = await $supabase.auth.signOut();
      if (error) throw error;
      removeSession();
      authStore().value = null;
    } catch (err: any) {
      logger("Signout failed:", err);
      alert(err.message);
      return false;
    }
  };

  return {
    signup,
    signin,
    signout,
  };
}
