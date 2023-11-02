/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { provinceApi } from "../../api/addressApi/province";
import { districtApi } from "../../api/addressApi/district";
import { wardApi } from "../../api/addressApi/ward";

export const getAllProvinceThunk: any = createAsyncThunk(
  "address/provinceAll",
  async (): Promise<any> => {
    try {
      const res = await provinceApi.getAllProvince();
      return res;
    } catch (error) {
      console.log(error);
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
      console.log(111)
      console.log(error);
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
  },
  reducers: {},
  extraReducers: {
    [getAllProvinceThunk.pending]: (state, action): void => {
      state.loading = true;
    },
    [getAllProvinceThunk.reject]: (state, action): void => {
      state.loading = false;
    },
    [getAllProvinceThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.province = action.payload;
    },
    [getDistrictByProvinceThunk.pending]: (state, action): void => {
      state.loading = true;
    },
    [getDistrictByProvinceThunk.reject]: (state, action): void => {
      state.loading = false;
    },
    [getDistrictByProvinceThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.district = action.payload;
    },
    [getWardByDistrictThunk.pending]: (state, action): void => {
      state.loading = true;
    },
    [getWardByDistrictThunk.reject]: (state, action): void => {
      state.loading = false;
    },
    [getWardByDistrictThunk.fulfilled]: (state, action): void => {
      state.loading = false;
      state.ward = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setNameCampaign, setDescribeCampaign, setCampaignRedux } =
//   testSlice.actions;
const { reducer: userReducer } = userSlice;

export default userReducer;
