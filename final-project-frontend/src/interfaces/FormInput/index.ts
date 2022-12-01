export type LoginInput = {
  login: string;
  password: string;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type SearchInput = {
  search: string;
};

export type ProfileUpdateInput = {
  profilePicture: string;
  fullName: string;
  email: string;
  phone: string;
  username: string;
};
