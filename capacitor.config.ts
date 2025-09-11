import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "dev.casmir.nuxtcaptodo",
  appName: "nuxt-cap-todo",
  webDir: ".output/public",
  server: {
    url: "http://localhost:3000",
    cleartext: true,
  },
};

export default config;
