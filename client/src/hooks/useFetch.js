import { useState } from "react";

/**
 * Our useFetch hook should be used for all communication with the server.
 *
 * route - This is the route you want to access on the server. It should NOT include the /api part, so should be /user or /user/{id}
 * onReceived - a function that will be called with the response of the server. Will only be called if everything went well!
 *
 * Our hook will give you an object with the properties:
 *
 * isLoading - true if the fetch is still in progress
 * error - will contain an Error object if something went wrong
 * get - function to make GET requests
 * post - function to make POST requests
 * put - function to make PUT requests
 * delete - function to make DELETE requests
 * cancelFetch - this function will cancel the fetch, call it when your component is unmounted
 */

const API_BASE_URL = `${process.env.BASE_SERVER_URL}/api`;

const createHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const useFetch = (route, onReceived) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (route.includes("api/")) {
    throw new Error("Route should not include the /api/ part");
  }

  const handleResponse = async (response) => {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }
    return response.json();
  };

  const fetchData = async (method, data = null, token = null) => {
    try {
      setError(null);
      setIsLoading(true);

      const options = {
        method,
        headers: createHeaders(token),
        signal,
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${API_BASE_URL}${route}`, options);
      const result = await handleResponse(response);

      if (onReceived) {
        onReceived(result);
      }

      return result;
    } catch (error) {
      if (error.name === "AbortError") {
        return; // Ignore abort errors
      }
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const get = (token) => fetchData("GET", null, token);
  const post = (data, token) => fetchData("POST", data, token);
  const put = (data, token) => fetchData("PUT", data, token);
  const del = (token) => fetchData("DELETE", null, token);

  return {
    isLoading,
    error,
    get,
    post,
    put,
    delete: del,
    cancelFetch: () => controller.abort(),
  };
};

export default useFetch;
