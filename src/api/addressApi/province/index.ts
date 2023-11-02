import { AxiosResponse } from "axios";
import axiosClient from "../../axiosClient";

export const provinceApi = {
  async getAllProvince(): Promise<AxiosResponse> {
    const url = "/address/province/all";
    return axiosClient.get(url);
  },
};
