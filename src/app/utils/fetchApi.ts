import { Dispatch } from "@reduxjs/toolkit";
import { Backend_url } from "../lib/Constant";
import { updatePostList } from "../store/slice";
// get method
export const GET_method = async (api: string, token?: string) => {
  try {
    const response = await fetch(Backend_url + api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
// post method
export const POST_method = async (body: any, api: string, token?: string) => {
  try {
    const response = await fetch(Backend_url + api, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
