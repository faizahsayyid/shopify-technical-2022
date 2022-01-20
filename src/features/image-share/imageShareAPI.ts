import axios from "axios";

export const fetchImagesById = (id: string): Promise<any> => {
  return axios({
    method: "GET",
    url: "https://images-api.nasa.gov/search",
    params: {
      media_type: "image",
      nasa_id: id,
    },
  });
};
