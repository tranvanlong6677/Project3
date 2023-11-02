import { AxiosResponse } from "axios";
import axiosClient from "../../axiosClient";

export const districtApi = {
  async getDistrictByProvince(codeProvince: string): Promise<AxiosResponse> {
    const url = `/address/district/by-province/${codeProvince}`;
    return axiosClient.get(url);
  },
};
