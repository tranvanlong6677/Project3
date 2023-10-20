import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export const authApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async login(data: any): Promise<AxiosResponse> {
    const url = "/users/login";
    return axiosClient.post(url, data);
  },
};
