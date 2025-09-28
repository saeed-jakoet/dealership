import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export async function apiPost(path, data = {}, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `API ${error.response.status}: ${
          error.response.data || error.response.statusText
        }`
      );
    } else if (error.request) {
      throw new Error("API request failed: No response received");
    } else {
      throw new Error(`API error: ${error.message}`);
    }
  }
}

export async function apiGet(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  try {
    const response = await axios.get(url, {
      headers: { Accept: "application/json", ...(options.headers || {}) },
      ...options,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `API ${error.response.status}: ${
          error.response.data || error.response.statusText
        }`
      );
    } else if (error.request) {
      throw new Error("API request failed: No response received");
    } else {
      throw new Error(`API error: ${error.message}`);
    }
  }
}
