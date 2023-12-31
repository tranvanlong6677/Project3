import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";
import {
  LoginRequestBody,
  LogoutRequestBody,
  RegisterRequestBody,
} from "../../utils/requestBody";

export const authApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async login(data: LoginRequestBody): Promise<AxiosResponse> {
    const url = "/users/login";
    return axiosClient.post(url, data);
  },
  async register(data: RegisterRequestBody): Promise<AxiosResponse> {
    const url = "/users/register";
    return axiosClient.post(url, data);
  },
  async logout(data: LogoutRequestBody): Promise<AxiosResponse> {
    const url = "/users/logout";
    return axiosClient.post(url,data);
  },
};
