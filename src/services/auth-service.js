import { apiClient } from "./api";

export const registerService = async (request = {}) => {
  console.log(request);

  await apiClient
    .post("users/register", request)
    .then((response) => {})
    .catch((error) => {
      console.error(error);
    });
};
