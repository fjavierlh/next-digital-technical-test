export type User = {
  id: string;
  name: string;
  email: string;
  city: string;
  website?: string;
  company?: string;
  albumIds: number[];
  todoListIds: number[];
};
