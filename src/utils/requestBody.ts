export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface RegisterRequestBody {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  date_of_birth: Date;
  phone_number: string;
}

export interface UserInfoRequesstBody {
  name: string;
  address: string;
  email: string;
}

export interface LogoutRequestBody {
  refresh_token: string;
}
