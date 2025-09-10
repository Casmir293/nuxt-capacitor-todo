<script setup lang="ts">
import type { VForm } from "vuetify/components";

const { signup } = useAuth();

const form = ref<VForm | null>(null);
const isFormValid = ref(false);
const loading = ref(false);
const payload = reactive<SignupPayload>({
  name: "",
  email: "",
  password: "",
});

/** validation rules */
const rules = reactive({
  required: (field: string) => (v: string) => !!v || `${field} is required`,
  email: (v: string) => (!!v && !!v.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) || "Email must be valid",
  min: (len: number) => (v: string) => v?.length >= len || `Min ${len} characters`,
});

/** submit signup */
const signupFn = async () => {
  await form.value?.validate();
  if (!isFormValid.value) return;

  loading.value = true;
  try {
    const res = await signup(payload);
    if (!res) return;
    alert("Signup successful 🎉! Please login");
    payload.name = "";
    payload.email = "";
    payload.password = "";
    navigateTo("/signin");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="d-flex align-center justify-center" style="height: 100dvh">
    <v-card class="pa-6" elevation="8" style="min-width: 350px">
      <h2 class="text-center mb-6">Create Account</h2>

      <v-form ref="form" v-model="isFormValid">
        <v-text-field
          v-model="payload.name"
          :rules="[rules.required('Username')]"
          label="Username"
          prepend-icon="mdi-account"
          outlined
          dense
        />
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
          :rules="[rules.required('Password'), rules.min(6)]"
          label="Password"
          type="password"
          prepend-icon="mdi-lock"
          outlined
          dense
        />

        <div class="d-flex justify-space-between mt-4">
          <p>Have an account? <NuxtLink to="/signin">Signin</NuxtLink></p>
          <v-btn color="primary" @click="signupFn" :disabled="loading" :loading="loading"> Sign Up </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>
