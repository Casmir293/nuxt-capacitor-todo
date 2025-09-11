import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";

/** store tokens natively */
export const saveSession = async (session: any) => {
  if (Capacitor.isNativePlatform()) {
    await Preferences.set({
      key: "supabase_session",
      value: JSON.stringify(session),
    });
  } else {
    useCookie("auth").value = "true";
  }
};

/** restores session on native */
export const loadSession = async () => {
  if (Capacitor.isNativePlatform()) {
    const { value } = await Preferences.get({ key: "supabase_session" });
    if (value) {
      const session = JSON.parse(value);
      const { $supabase } = useNuxtApp();
      await $supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
      return session;
    }
  }
  return null;
};

/** remove session on native */
export const removeSession = async () => {
  if (Capacitor.isNativePlatform()) {
    await Preferences.remove({ key: "supabase_session" });
  }
};

/** auth user state */
export const authStore = () => useState<any | null>("auth_user", () => null);
