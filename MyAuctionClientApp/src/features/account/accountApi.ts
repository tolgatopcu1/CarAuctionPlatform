import axios from "axios"
import { ApiResponse } from "../../types/ApiResponse"
import { RegisterUser } from "../../types/RegisterUser"
import { LoginUser } from "../../types/LoginUser";
import { LoginResult } from "../../types/LoginResult";

export const fetchRegisterUser = async (userData: RegisterUser): Promise<ApiResponse<void>> => {
    try {
    const response = await axios.post<ApiResponse<void>>(
      'http://localhost:5139/api/User/Register',
      userData
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }

    return {
      isSuccess: false,
      statusCode: 500,
      errorMessages: ['Kayıt sırasında bir hata oluştu.'],
    };
  }
}

export const fetchLoginUser = async (userData: LoginUser): Promise<ApiResponse<LoginResult>> => {
  try {
    const response = await axios.post<ApiResponse<LoginResult>>(
      'http://localhost:5139/api/User/Login',
      userData
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }

    return {
      isSuccess: false,
      statusCode: 500,
      errorMessages: ['Giriş yapma sırasında bir hata oluştu.'],
    };
  }
}