import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";
import {
  CreateANewCarRequestBody,
  UserInfoRequesstBody,
} from "../../utils/requestBody";

export const userApi = {
  async updateUserInfo(data: UserInfoRequesstBody): Promise<AxiosResponse> {
    const url = "/users/update-user-info";
    return axiosClient.post(url, data);
  },
  async createNewCar(data: CreateANewCarRequestBody): Promise<AxiosResponse> {
    const url = "/cars/create-new-car";
    return axiosClient.post(url, data);
  },
  async getAllCars(): Promise<AxiosResponse>{
    const url = "/cars/get-all-cars";
    return axiosClient.get(url)
  }
};
