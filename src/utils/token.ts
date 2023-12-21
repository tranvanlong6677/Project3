import { userApi } from "../api/userApi";

export interface tokenDecode {
  user_id: string;
  token_type: number;
  iat: number;
  exp: number;
}

export const refreshToken = async (refresh_token: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await userApi.refreshTokenApi(refresh_token);
    console.log("response ref", response);
    // Lưu trữ token mới và refresh token mới vào localStorage
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);

    return response.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
