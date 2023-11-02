import { AxiosResponse } from "axios";
import axiosClient from "../../axiosClient";

export const wardApi = {
  async getWardByDistrict(districtCode: string): Promise<AxiosResponse> {
    const url = `/address/ward/by-district/${districtCode}`;
    return axiosClient.get(url);
  },
};
