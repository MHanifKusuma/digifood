export interface IUser {
  name: string;
  email: string;
  wallet_number: string;
  balance: number;
}

export interface IUserState {
  code: number;
  data: IUser;
  is_error: boolean;
  error_message: string | null;
  is_loading: boolean;
}
