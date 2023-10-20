import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "counter",
  initialState: {},
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const { setNameCampaign, setDescribeCampaign, setCampaignRedux } =
//   testSlice.actions;

export default testSlice.reducer;
