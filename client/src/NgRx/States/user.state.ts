import { UserModel } from "src/models/user.model";

export interface UserState{
  users: UserModel[];
  user:UserModel|null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
}
