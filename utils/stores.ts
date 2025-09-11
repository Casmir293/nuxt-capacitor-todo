import { ref } from "vue";

/** auth user state */
export const authStore = () => useState<any | null>("auth_user", () => null);

/** online/offline state */
export const offlineStore = () => useState<boolean>("is_online", () => true);
