import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

export const usePosts = (userId) => {
  return useQuery(["posts", userId], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );
};
