import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";
import { UserInfoRequesstBody } from "../../utils/requestBody";

export const userApi = {
  async updateUserInfo(data: UserInfoRequesstBody): Promise<AxiosResponse> {
    const url = "/users/update-user-info";
    return axiosClient.post(url, data);
  },
  //   async getDataUser()
};
