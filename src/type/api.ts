export interface HomeAPIResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface HomeHeroInfo {
  title: string;
  subtitle: string;
  description: string;
  img: string;
}

export interface CurrentUserAPIResponse {
  name: string;
  avatar: string;
}

export interface UserFetchManagement {
  list: UserManagement[];
}

export interface UserManagement {
  id: string;
  name: string;
  email: string;
  nickName: string;
  phone: string;
}
