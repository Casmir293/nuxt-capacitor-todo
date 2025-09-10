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
      console.log("Signup failed:", err);
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
      return data;
    } catch (err: any) {
      console.log("Signin failed:", err);
      alert(err.message);
      return null;
    }
  };

  const signout = async () => {
    try {
      const { error } = await $supabase.auth.signOut();
      if (error) throw error;
      navigateTo("/signin");
      return true;
    } catch (err: any) {
      console.log("Signout failed:", err);
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
