import axios, { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";
import {
  CreateANewCarRequestBody,
  UserInfoRequesstBody,
} from "../../utils/requestBody";

export const userApi = {
  async updateUserInfo(data: UserInfoRequesstBody): Promise<AxiosResponse> {
    console.log(data);
    const url = "/users/update";
    return axiosClient.put(url, data);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createNewCar(data: CreateANewCarRequestBody): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    console.log("data image", data.image[0]);

    const url = "/cars/create";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await axiosClient.post(url, data);
    const carId = response.insertedId;
    // formData.append("car_id", response.insertedId);
    console.log(">>> check ", carId);
    const url2 = `medias/upload-image/${carId}`;

    const response2 = await axios.post(
      `http://localhost:8888/${url2}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response", response2);
    return response2;
  },
  async getAllCars(): Promise<AxiosResponse> {
    const url = "/cars/all";
    return axiosClient.get(url);
  },
  async getAllTypeCars(): Promise<AxiosResponse> {
    const url = "/cars/all-type";
    return axiosClient.get(url);
  },
  // async uploadImage(file: any): Promise<AxiosResponse> {
  //   const form = new FormData();
  //   form.append("image", fileInput.files[0]);

  //   // axios.post("https://example.com", form);
  //   const url = "/cars/all-type";
  //   return axiosClient.post(url, form);
  // },
};
