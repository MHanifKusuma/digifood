import { IUser, IUserState } from "interfaces/User";
import { Dispatch } from "react";
import { IResetUser, UserAction, UserActionType } from "./type";

export const SetUser = (payload: IUser): UserAction => {
  return {
    type: UserActionType.SET_USER,
    payload,
  };
};

export const ResetUser = (): UserAction => {
  return {
    type: UserActionType.RESET_USER,
  };
};

export const fetchUser = (token: string) => {
  return (dispatch: Dispatch<UserAction>): void => {
    const res = fetch(`http://localhost:8080/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("Session is over, please login again");
          }
        }

        return res.json();
      })
      .then((data) => dispatch(SetUser(data.data)));
  };
};
