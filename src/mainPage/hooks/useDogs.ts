// src/hooks/useDogs.ts
import { useQuery } from "react-query";
import { Dog, DogItem } from "../helpers/interface";

const fetchDogs = async (limit: number, page: number): Promise<Dog[]> => {
  try {
    const demoKey: string =
      "live_55Ak58jSbMGcD8KJn8xY0244EULjkn7Bnv3ICBjUyYxwhH9iWErLOndenZsXvrSa";
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": demoKey,
    });

    const requestOptions: RequestInit = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    let url: string = `https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=${limit}`;

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Failed to fetch dogs data");
    }

    const data = await response.json();

    return data?.map((item: DogItem) => {
      const breed = item?.breeds[0] || {};
      return {
        id: item?.id || "-",
        name: breed?.name || "-",
        height: breed?.height?.imperial || "-",
        width: breed?.weight?.imperial || "-",
        image: item?.url ||"",
        bred_for: breed?.bred_for || "-",
        breed_group: breed?.breed_group || "-",
        life_span: breed?.life_span || "-",
        temperament: breed?.temperament || "-",
      };
    });
  } catch (error) {
    throw new Error("Failed to fetch dogs data");
  }
};

export const useDogs = (limit: number, page: number) => {
  return useQuery(["dogs", limit, page], () => fetchDogs(limit, page), {
    staleTime: 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });
};
