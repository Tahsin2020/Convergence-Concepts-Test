import React, { useState } from "react";
import axios from "axios";
// import Card from "./Card";
import { useQuery } from "@tanstack/react-query";

async function fetchData() {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos"
  );
  return data;
}

function vw(percent) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (percent * w) / 100;
}

function shuffle(arr, index = 0) {
  console.log(index);
  if (index >= arr.length) return [];
  return [arr[index]] + shuffle(arr, index + 2) + [arr[-1 - index]];
}

export const CardHolder = () => {
  const [index, setIndex] = useState(0);
  let { isLoading, isError, error, data } = useQuery(["photos"], fetchData, {
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
    <div>
      <div className="container">
        {/* {data.map((res, i) => {
          return (
            <li className="Photo" key={i}>
              <h1 className="Title">{res.title}</h1>
              <img src={res.url} alt={res.thumbnailUrl} className="Image"></img>
            </li>
          );
        })} */}
        <div className="Photo" id="Left">
          <h1 className="Title">{data[index].title}</h1>
          <img
            src={data[index].url}
            alt={data[index].thumbnailUrl}
            className="Image"
          ></img>
        </div>
        <div className="Photo" id="Middle">
          <h1 className="Title">{data[index].title}</h1>
          <img
            src={data[index + 1].url}
            alt={data[index + 1].thumbnailUrl}
            className="Image"
          ></img>
        </div>
        <div className="Photo" id="Right">
          <h1 className="Title">{data[index].title}</h1>
          <img
            src={data[index + 2].url}
            alt={data[index + 2].thumbnailUrl}
            className="Image"
          ></img>
        </div>
      </div>
      <button
        className="Button"
        onClick={() => {
          window.scrollBy(vw(87), 0);
          // data = shuffle(data);
        }}
      >
        Randomize List
      </button>
    </div>
  );
};
