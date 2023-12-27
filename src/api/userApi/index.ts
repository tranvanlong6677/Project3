import axios, { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";
import {
  BookingCarType,
  CreateANewCarRequestBody,
  UserInfoRequesstBody,
} from "../../utils/requestBody";

export const userApi = {
  async refreshTokenApi(refreshToken: string): Promise<AxiosResponse> {
    const url = "/users/refresh-token";
    return axiosClient.post(url, { refresh_token: refreshToken });
  },
  async updateUserInfo(data: UserInfoRequesstBody): Promise<AxiosResponse> {
    const url = "/users/update";
    return axiosClient.put(url, data);
  },
  async getUserInfo(): Promise<AxiosResponse> {
    const url = `/users/info`;
    return axiosClient.get(url);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createNewCar(data: CreateANewCarRequestBody): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    console.log("data image", data.image[0]);

    const url = "/cars/create";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await axiosClient.post(url, data);
    const carId = response.result.insertedId;
    const url2 = `medias/upload-image/${carId}`;

    await axios.post(`http://localhost:8888/${url2}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
  async getAllCars(): Promise<AxiosResponse> {
    const url = "/cars/all";
    return axiosClient.get(url);
  },
  async getListCars(page: string, perPage: string): Promise<AxiosResponse> {
    const url = `/cars/page=${page}/per-page=${perPage}`;
    return axiosClient.get(url);
  },
  async getListCarSearch({
    provinceCode,
    page,
    perPage,
  }: {
    provinceCode: string;
    page: string;
    perPage: string;
  }): Promise<AxiosResponse> {
    console.log("adu", provinceCode);
    const url = `/cars/search/province-code=${provinceCode}/page=${page}/per-page=${perPage}`;
    return axiosClient.get(url);
  },
  async getAllTypeCars(): Promise<AxiosResponse> {
    const url = "/cars/all-type";
    return axiosClient.get(url);
  },
  async bookingCar(data: BookingCarType): Promise<AxiosResponse> {
    const url = "/cars/booking";
    return axiosClient.post(url, data);
  },
  async getListBooking(): Promise<AxiosResponse> {
    const url = "/cars/list-booking";
    return axiosClient.get(url);
  },
  async getListBookingPaginate(
    page: number,
    perPage: number
  ): Promise<AxiosResponse> {
    const url = `/cars/list-booking/page/${page}/per-page/${perPage}`;
    return axiosClient.get(url);
  },
  async getRentalListings(): Promise<AxiosResponse> {
    const url = "/cars/rental-listings";
    return axiosClient.get(url);
  },
  async getRentalListingsPaginate(
    page: number,
    perPage: number
  ): Promise<AxiosResponse> {
    const url = `/cars/rental-listings/page/${page}/per-page/${perPage}`;
    return axiosClient.get(url);
  },
  async completeOrder({
    booking_id,
    car_id,
  }: {
    booking_id: string;
    car_id: string;
  }): Promise<AxiosResponse> {
    const url = "/cars/complete-order";
    return axiosClient.put(url, { booking_id, car_id });
  },
  async getListCarsUser({
    page,
    perPage,
  }: {
    page: string;
    perPage: string;
  }): Promise<AxiosResponse> {
    console.log(page, perPage);
    const url = `/cars/list-cars-user/page=${page}/per-page=${perPage}`;
    return axiosClient.get(url);
  },
};
