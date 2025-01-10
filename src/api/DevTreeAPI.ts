import { isAxiosError } from "axios";
import api from "../config/axios";
import { ProfileForm, User } from "../types";

export async function getUser() {
  try {
    const { data } = await api.get<User>("/user");

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateProfile(formdata: ProfileForm) {
  try {
    const { data } = await api.patch<string>("/user", formdata);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
