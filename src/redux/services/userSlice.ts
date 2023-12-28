/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { provinceApi } from "../../api/addressApi/province";
import { districtApi } from "../../api/addressApi/district";
import { wardApi } from "../../api/addressApi/ward";
// import { userApi } from "../../api/userApi";
import {
  BookingCarType,
  CreateANewCarRequestBody,
  LoginRequestBody,
  UserInfoRequesstBody,
} from "../../utils/requestBody";
import { authApi } from "../../api/authApi";
import { userApi } from "../../api/userApi";

export const getAllProvinceThunk: any = createAsyncThunk(
  "address/provinceAll",
  async (): Promise<any> => {
    try {
      const res = await provinceApi.getAllProvince();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const getDistrictByProvinceThunk: any = createAsyncThunk(
  "address/getDistrictByProvince",
  async (provinceCode: string): Promise<any> => {
    try {
      const res = await districtApi.getDistrictByProvince(provinceCode);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getWardByDistrictThunk: any = createAsyncThunk(
  "address/getWardByDistrict",
  async (districtCode: string): Promise<any> => {
    try {
      const res = await wardApi.getWardByDistrict(districtCode);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const loginThunk: any = createAsyncThunk(
  "user/login",
  async (data: LoginRequestBody): Promise<any> => {
    try {
      const res = await authApi.login(data);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getUserInfoThunk: any = createAsyncThunk(
  "user/get-info",
  async (): Promise<any> => {
    try {
      const res = await userApi.getUserInfo();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const updateUserInfoThunk: any = createAsyncThunk(
  "user/update",
  async (dataUpdate: UserInfoRequesstBody): Promise<any> => {
    try {
      const res = await userApi.updateUserInfo(dataUpdate);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const bookingCarThunk: any = createAsyncThunk(
  "cars/booking",
  async (data: BookingCarType): Promise<any> => {
    try {
      const res = await userApi.bookingCar(data);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getListBookingThunk: any = createAsyncThunk(
  "cars/list-booking",
  async (): Promise<any> => {
    try {
      const res = await userApi.getListBooking();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getListBookingPaginateThunk: any = createAsyncThunk(
  "cars/list-booking-paginate",
  async ({
    page,
    perPage,
  }: {
    page: number;
    perPage: number;
  }): Promise<any> => {
    try {
      const res = await userApi.getListBookingPaginate(page, perPage);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getRentalListingsThunk: any = createAsyncThunk(
  "cars/rental-listings",
  async (): Promise<any> => {
    try {
      const res = await userApi.getRentalListings();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getRentalListingsPaginateThunk: any = createAsyncThunk(
  "cars/rental-listings",
  async ({
    page,
    perPage,
  }: {
    page: number;
    perPage: number;
  }): Promise<any> => {
    try {
      const res = await userApi.getRentalListingsPaginate(page, perPage);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const createCarThunk: any = createAsyncThunk(
  "cars/create",
  async (data: CreateANewCarRequestBody): Promise<any> => {
    try {
      const res = await userApi.createNewCar(data);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const completeOrderThunk: any = createAsyncThunk(
  "cars/complete-order",
  async ({
    booking_id,
    car_id,
  }: {
    booking_id: string;
    car_id: string;
  }): Promise<any> => {
    try {
      const res = await userApi.completeOrder({ booking_id, car_id });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const getListCarsThunk: any = createAsyncThunk(
  "cars/list-cars",
  async ({
    page,
    perPage,
  }: {
    page: string;
    perPage: string;
  }): Promise<any> => {
    try {
      const res = await userApi.getListCars(page, perPage);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const getListCarSearchThunk: any = createAsyncThunk(
  "cars/list-cars-search",
  async ({
    provinceCode,
    page,
    perPage,
  }: {
    provinceCode: string;
    page: string;
    perPage: string;
  }) => {
    try {
      const res = await userApi.getListCarSearch({
        provinceCode,
        page,
        perPage,
      });
      console.log(">>> check res", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getListCarsUserThunk: any = createAsyncThunk(
  "cars/list-cars-user",
  async ({
    page,
    perPage,
  }: {
    page: string;
    perPage: string;
  }): Promise<any> => {
    try {
      const res = await userApi.getListCarsUser({ page, perPage });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const cancelOrderThunk: any = createAsyncThunk(
  "cars/list-cars-user",
  async ({ bookingId }: { bookingId: string }) => {
    try {
      console.log("bookingId", bookingId);
      const res = await userApi.cancelOrder(bookingId);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    province: [],
    district: [],
    ward: [],
    user: {},
    listCars: [],
    totalListCars: 0,
    carDataBooking: {},
    listBooking: [],
    listBookingPaginate: [],
    rentalListings: [],
    pageCountListBooking: 0,
    rentalListingsPaginate: [],
    pageCountRentalListings: 0,
    listCarsUser: [],
    totalCountListCarsUser: 0,
  },
  reducers: {
    setCarDataBooking: (state, action) => {
      state.carDataBooking = action.payload;
    },
  },
  extraReducers: {
    [getAllProvinceThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getAllProvinceThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getAllProvinceThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.province = action.payload;
    },
    [getDistrictByProvinceThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getDistrictByProvinceThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getDistrictByProvinceThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.district = action.payload;
    },
    [getWardByDistrictThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getWardByDistrictThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getWardByDistrictThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.ward = action.payload;
    },
    [loginThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [loginThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [loginThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.user = action.payload?.user;
    },
    [bookingCarThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [bookingCarThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [bookingCarThunk.fulfilled]: (state, _action): void => {
      state.loading = false;
    },
    [getListBookingThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getListBookingThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getListBookingThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      // action.payload.result.pop();
      const listClone: any = Object.values(action.payload?.result);
      listClone.pop();

      state.listBooking = listClone;
    },
    [getRentalListingsThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getRentalListingsThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getRentalListingsThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      const listClone: any = Object.values(action.payload);
      listClone.pop();
      state.rentalListings = listClone;
    },
    [completeOrderThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [completeOrderThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [completeOrderThunk.fulfilled]: (state, _action): void => {
      state.loading = false;
    },
    [getListBookingPaginateThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getListBookingPaginateThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getListBookingPaginateThunk.fulfilled]: (state, action): void => {
      state.loading = false;

      state.listBookingPaginate = action.payload[0]?.result;
      state.pageCountListBooking = action.payload[0]?.totalCount[0]?.totalCount;
    },
    [getRentalListingsPaginateThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getRentalListingsPaginateThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getRentalListingsPaginateThunk.fulfilled]: (state, action): void => {
      state.loading = false;

      state.rentalListingsPaginate = action.payload[0]?.result;
      state.pageCountRentalListings =
        action.payload[0]?.totalCount[0]?.totalCount;
    },
    [getListCarsThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getListCarsThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getListCarsThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.listCars = action.payload[0]?.result;
      state.totalListCars = action.payload[0]?.totalCount[0]?.totalCount;
    },
    [getUserInfoThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getUserInfoThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getUserInfoThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.user = action.payload;
    },
    [updateUserInfoThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [updateUserInfoThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [updateUserInfoThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.user = action.payload?.result;
    },
    [getListCarsUserThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getListCarsUserThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getListCarsUserThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.listCarsUser = action.payload[0]?.result;
      console.log(action.payload);
      state.totalCountListCarsUser =
        action.payload[0]?.totalCount[0]?.totalCount;
    },
    [getListCarSearchThunk.pending]: (state, _action): void => {
      state.loading = true;
    },
    [getListCarSearchThunk.reject]: (state, _action): void => {
      state.loading = false;
    },
    [getListCarSearchThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      console.log("action.payload la", action.payload);
      state.listCars = action.payload[0]?.result;
      state.totalListCars = action.payload[0]?.totalCount[0]?.totalCount;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setNameCampaign, setDescribeCampaign, setCampaignRedux } =
//   testSlice.actions;
export const { setCarDataBooking } = userSlice.actions;

const { reducer: userReducer } = userSlice;

export default userReducer;
