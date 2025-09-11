export default function useTask() {
  const { $supabase } = useNuxtApp();
  const loading = reactive({
    addTask: false,
    fetchTasks: false,
    deleteTask: false,
  });

  const addTask = async (payload: TaskPayload) => {
    try {
      loading.addTask = true;
      const { error } = await $supabase.from("tasks").insert([payload]);
      if (error) throw error;
      return true;
    } catch (err: any) {
      logger("Add task failed:", err);
      alert(err.message);
      return false;
    } finally {
      loading.addTask = false;
    }
  };

  const fetchTasks = async () => {
    try {
      loading.fetchTasks = true;
      const { data, error } = await $supabase.from("tasks").select("*");
      if (error) throw error;
      return data;
    } catch (err: any) {
      logger("Fetch tasks failed:", err);
      alert(err.message);
      return [];
    } finally {
      loading.fetchTasks = false;
    }
  };

  const deleteTask = async (taskID: number) => {
    try {
      loading.deleteTask = true;
      const { error } = await $supabase.from("tasks").delete().eq("id", taskID);
      if (error) throw error;
      return true;
    } catch (err: any) {
      logger("Delete task failed:", err);
      alert(err.message);
      return false;
    } finally {
      loading.deleteTask = false;
    }
  };

  return {
    loading,
    addTask,
    fetchTasks,
    deleteTask,
  };
}
