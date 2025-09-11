<script setup lang="ts">
import type { VForm } from "vuetify/components";

definePageMeta({
  middleware: "auth",
});

const { loading, addTask, fetchTasks, deleteTask } = useTask();
const { signout } = useAuth();

const dialog = ref(false);
const tasks = ref<Task[]>([]);
const isFormValid = ref(false);
const form = ref<VForm | null>(null);
const newTask = reactive<TaskPayload>({
  title: "",
  desc: "",
  photo: null,
});

/** validation */
const rules = reactive({
  required: (title: string) => (v: string) => (v || "").length >= 1 || `${title} is required`,
});

/**  handle file upload */
const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    newTask.photo = URL.createObjectURL(target.files[0]);
  }
};

/**  create new task */
const addTaskFn = async () => {
  await form.value?.validate();
  if (!isFormValid.value) return;

  const res = await addTask(newTask);
  if (!res) return;

  dialog.value = false;
  newTask.title = "";
  newTask.desc = "";
  newTask.photo = "";
  tasks.value = (await fetchTasks()) as Task[];
};

/**  delete task */
const deleteTaskFn = async (TaskID: number) => {
  const res = await deleteTask(TaskID);
  if (!res) return;
  tasks.value = (await fetchTasks()) as Task[];
};

onMounted(async () => {
  tasks.value = (await fetchTasks()) as Task[];
});
</script>

<template>
  <div class="pa-4">
    <p>Hello, <b>User</b> 👋</p>
    <h1 class="my-5 text-center">📝 Plan your Day</h1>

    <!-- CTA -->
    <div class="d-flex align-center justify-space-between">
      <v-btn color="primary" @click="dialog = true" :disabled="loading.fetchTasks">Add Task</v-btn>
      <v-btn @click="signout" color="error" icon="mdi-logout" variant="tonal"></v-btn>
    </div>

    <!-- Add Task Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-form ref="form" v-model="isFormValid">
        <v-card>
          <v-card-title class="text-h6">New Task</v-card-title>
          <v-card-text>
            <v-text-field :rules="[rules.required('Title')]" v-model="newTask.title" label="Title" outlined dense />
            <v-textarea
              :rules="[rules.required('Description')]"
              v-model="newTask.desc"
              label="Description"
              outlined
              dense
            />
            <v-file-input label="Upload Photo" accept="image/*" prepend-icon="mdi-camera" @change="handleFileUpload" />
            <div v-if="newTask.photo" class="mt-3 text-center">
              <v-img :src="newTask.photo" max-width="120" max-height="120" class="rounded" />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="dialog = false" :disabled="loading.addTask">Close</v-btn>
            <v-btn color="primary" @click="addTaskFn" :disabled="loading.addTask" :loading="loading.addTask"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- Task List -->
    <div class="mt-6">
      <template v-if="!loading.fetchTasks">
        <v-row dense>
          <v-col v-for="task in tasks" :key="task.id" cols="12" sm="6" md="4">
            <v-card>
              <v-img v-if="task.photo" :src="task.photo" height="180px" cover />
              <v-card-title>{{ task.title }}</v-card-title>
              <v-card-text>{{ task.desc }}</v-card-text>
              <v-card-actions>
                <v-btn
                  color="error"
                  variant="text"
                  @click="deleteTaskFn(task.id)"
                  :disabled="loading.deleteTask"
                  :loading="loading.deleteTask"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <div class="d-flex align-center justify-center" style="height: 80dvh">
          <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
        </div>
      </template>
    </div>
  </div>
</template>
