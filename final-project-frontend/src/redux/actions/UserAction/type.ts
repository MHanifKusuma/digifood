import { IUser, IUserState } from "interfaces/User";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export enum UserActionType {
  SET_USER = "SET_USER",
  RESET_USER = "RESET_USER",
  SET_ERROR = "SET_ERROR",
}

export interface ISetUser {
  type: UserActionType.SET_USER;
  payload: IUser;
}

export interface IResetUser {
  type: UserActionType.RESET_USER;
}

export interface ISetUserError {
  type: UserActionType.SET_ERROR;
  payload: string | null;
}

export type UserAction = ISetUser | IResetUser | ISetUserError;

export type UserDispatch = ThunkDispatch<IUserState, any, AnyAction>;
