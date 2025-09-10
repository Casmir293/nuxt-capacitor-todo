export {};

declare global {
  interface User {
    id: number;
    email: string;
    name: string;
    created_at: string;
  }
  interface SignupPayload {
    name: string;
    email: string;
    password: string;
  }

  interface SigninPayload {
    email: string;
    password: string;
  }

  interface TaskPayload {
    title: string;
    photo: null | string;
    desc: string;
  }

  interface Task {
    id: number;
    title: string;
    photo: null | string;
    desc: string;
  }
}
