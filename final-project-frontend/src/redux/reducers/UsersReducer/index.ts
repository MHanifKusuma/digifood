import { IUserState } from "interfaces/User";
import { UserAction, UserActionType } from "redux/actions/UserAction/type";

const initialUserState: IUserState = {
  user: {
    FullName: "",
    Email: "",
    ProfilePicture: "",
    Phone: "",
    Role: -1,
    Username: "",
    UserFavorite: [],
    UserCoupon: [],
  },
  userError: "",
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
        ...state,
        user: {
          FullName: "",
          Email: "",
          ProfilePicture: "",
          Phone: "",
          Role: -1,
          Username: "",
          UserFavorite: [],
          UserCoupon: [],
        },
      };

    case UserActionType.SET_ERROR: {
      return {
        ...state,
        userError: action.payload,
      };
    }

    default:
      return state;
  }
}
