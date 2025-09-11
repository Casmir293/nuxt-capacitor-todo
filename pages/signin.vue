<script setup lang="ts">
import type { VForm } from "vuetify/components";

definePageMeta({
  middleware: "guest",
});

const { signin } = useAuth();

const form = ref<VForm | null>(null);
const isFormValid = ref(false);
const loading = ref(false);
const payload = reactive<SigninPayload>({
  email: "",
  password: "",
});

/** validation rules */
const rules = reactive({
  required: (field: string) => (v: string) => !!v || `${field} is required`,
  email: (v: string) => (!!v && !!v.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) || "Email must be valid",
});

/** submit signin */
const signinFn = async () => {
  await form.value?.validate();
  if (!isFormValid.value) return;

  loading.value = true;
  try {
    const res = await signin(payload);
    if (!res) return;
    navigateTo("/");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="d-flex align-center justify-center" style="height: 100dvh">
    <v-card class="pa-6" elevation="8" style="min-width: 350px">
      <h2 class="text-center mb-6">Login your Account</h2>

      <v-form ref="form" v-model="isFormValid">
        <v-text-field
          v-model="payload.email"
          :rules="[rules.required('Email'), rules.email]"
          label="Email"
          prepend-icon="mdi-email"
          outlined
          dense
        />
        <v-text-field
          v-model="payload.password"
          :rules="[rules.required('Password')]"
          label="Password"
          type="password"
          prepend-icon="mdi-lock"
          outlined
          dense
        />

        <div class="d-flex justify-space-between mt-4">
          <p>No account? <NuxtLink to="/signup">Signup</NuxtLink></p>
          <v-btn color="primary" @click="signinFn" :disabled="loading" :loading="loading"> Login </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>
