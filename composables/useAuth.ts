export default function useAuth() {
  const { $supabase } = useNuxtApp();
  const loading = ref(false);

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const { data, error } = await $supabase.from("users").select("*");
      if (error) throw error;
      return data;
    } catch (err: any) {
      console.log("Fetch users failed:", err);
      alert(err.message);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    fetchUsers,
  };
}
