import { jwtDecode } from "jwt-decode";
import { userApi } from "../api/userApi";

export interface tokenDecode {
  user_id: string;
  token_type: number;
  iat: number;
  exp: number;
}

export const isAccessTokenExpired = (access_token: string) => {
  // const accessToken = localStorage.getItem("access_token");
  if (!access_token) {
    // Nếu không có token, coi như đã hết hạn
    return true;
  }
  try {
    const decodedToken = jwtDecode(access_token) as tokenDecode;
    console.log("decodedToken", decodedToken);
    // Lấy thời gian hết hạn từ token
    const expirationTime = decodedToken.exp * 1000; // Đổi giây thành mili giây

    // So sánh thời gian hết hạn với thời gian hiện tại
    const currentTime = new Date().getTime();

    // Nếu thời gian hết hạn nhỏ hơn thời gian hiện tại, coi như đã hết hạn
    return expirationTime < currentTime;
  } catch (error) {
    // Nếu có lỗi khi giải mã token, coi như đã hết hạn
    console.error("Error decoding access token:", error);
    return true;
  }
};

export const refreshToken = async () => {
  try {
    const refresh_token = localStorage.getItem("refresh_token") || "";
    const response = await userApi.refreshTokenApi(refresh_token);
    console.log("response ref", response);
    // Lưu trữ token mới và refresh token mới vào localStorage
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    return response.data.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
