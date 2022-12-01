import { IUserState } from "interfaces/User";
import { UserAction, UserActionType } from "redux/actions/UserAction/type";

const initialUserState: IUserState = {
  user: {
    FullName: "",
    Email: "",
    ProfilePicture: "",
    Phone: "",
    Username: "",
    UserFavorite: [],
    UserCoupon: [],
  },
};

export function UsersReducer(
  state = initialUserState,
  action: UserAction
): IUserState {
  switch (action.type) {
    case UserActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case UserActionType.RESET_USER:
      return {
        user: {
          FullName: "",
          Email: "",
          ProfilePicture: "",
          Phone: "",
          Username: "",
          UserFavorite: [],
          UserCoupon: [],
        },
      };

    default:
      return state;
  }
}
