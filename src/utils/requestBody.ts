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
}

export interface LogoutRequestBody {
  refresh_token: string;
}
