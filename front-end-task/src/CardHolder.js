import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
async function fetchData() {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos"
  );
  return data;
}

export const CardHolder = () => {
  const { isLoading, isError, error, data } = useQuery(["users"], fetchData);
  if (isLoading) {
    return <div>Data is loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }
  return (
    <ul className="list-group">
      {data.map((res, i) => {
        return (
          <li className="list-group-item mb-3" key={i}>
            <h1>{res.albumId}</h1>
            <h2>{res.id}</h2>
            <h3>{res.title}</h3>
            <h4>{res.url}</h4>
            <h5>{res.thumbnailUrl}</h5>
          </li>
        );
      })}
    </ul>
  );
};
