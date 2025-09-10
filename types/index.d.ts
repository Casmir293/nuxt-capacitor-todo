export {};

declare global {
  interface User {
    id: number;
    email: string;
    name: string;
    photo: string;
    created_at: string;
  }
}
