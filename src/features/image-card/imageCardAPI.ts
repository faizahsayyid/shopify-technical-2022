import axios from "axios";

export function fetchImages(query?: string, page?: number): Promise<any> {
  return axios({
    method: "GET",
    url: "https://images-api.nasa.gov/search",
    params: {
      q: query ? query : "planets",
      media_type: "image",
      page: page ? page : 1,
    },
  });
}
