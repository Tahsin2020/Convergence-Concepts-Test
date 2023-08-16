import React from "react";
import axios from "axios";
// import Card from "./Card";
import { useQuery } from "@tanstack/react-query";

async function fetchData() {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos"
  );
  return data;
}

export const CardHolder = () => {
  const { isLoading, isError, error, data } = useQuery(["photos"], fetchData, {
    structuralSharing: false,
    staleTime: Infinity,
    cacheTime: Infinity, // 10 minutes
  });
  if (isLoading) {
    return <div>Data is loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }
  return (
    <ul className="container">
      {data.map((res, i) => {
        return (
          <li className="Photo" key={i}>
            <h1 className="Title">{res.title}</h1>
            <img src={res.url} alt={res.thumbnailUrl} className="Image"></img>
          </li>
        );
      })}
    </ul>
  );
};
