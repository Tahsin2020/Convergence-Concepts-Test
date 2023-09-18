import React, { useEffect, useState } from "react";
import $, { data } from "jquery";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
async function fetchData() {
  const { data } = await axios.get(
    "http://jsonplaceholder.typicode.com/photos"
  );
  return data;
}

function randomize(arr, n) {
  // Start from the last element and swap one by one. We don't
  // need to run for the first element that's why i > 0
  for (var i = n - 1; i >= 0; i--) {
    // Pick a random index from 0 to i
    var j = Math.floor(Math.random() * (i + 1));

    // Swap arr[i] with the element at random index
    let save = arr[i];
    arr[i] = arr[j];
    arr[j] = save;
  }
  return arr;
}

var titles = [];
var images = [];
var randomized = false;

const HoverCarousel = () => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    const scope = $(".carousel");
    const wrap = scope.find("ul").parent();
    let containerWidth = 0;
    let scrollWidth = 0;
    let posFromLeft = 0;
    let scrollPos = 0;
    let animated = null;

    const onMouseEnter = (e) => {
      containerWidth = wrap.width();
      scrollWidth = wrap[0].scrollWidth;
      posFromLeft = wrap.offset().left;
      const stripePos = e.pageX - posFromLeft;
      const pos = stripePos / containerWidth;
      scrollPos = (scrollWidth - containerWidth) * pos;

      wrap.css("scroll-behavior", "smooth");

      if (scrollPos < 0) scrollPos = 0;
      if (scrollPos > scrollWidth - containerWidth)
        scrollPos = scrollWidth - containerWidth;

      wrap.scrollLeft(scrollPos);

      scope.css("--scrollWidth", (containerWidth / scrollWidth) * 100 + "%");
      scope.css("--scrollLeft", (scrollPos / scrollWidth) * 100 + "%");

      clearTimeout(animated);
      animated = setTimeout(() => {
        wrap.css("scroll-behavior", "auto");
        animated = null;
      }, 200);
    };

    const onMouseMove = (e) => {
      if (animated) return;
      const stripePos = e.pageX - posFromLeft;
      const pos = stripePos / containerWidth;
      scrollPos = (scrollWidth - containerWidth) * pos;

      wrap.scrollLeft(scrollPos);

      if (scrollPos < scrollWidth - containerWidth) {
        scope.css("--scrollLeft", (scrollPos / scrollWidth) * 100 + "%");
      }

      scope.attr(
        "data-at",
        (scrollPos > 5 ? "left " : " ") +
          (scrollWidth - containerWidth - scrollPos > 5 ? "right" : "")
      );
    };

    const bind = () => {
      scope.on("mouseenter", onMouseEnter);
      scope.on("mousemove", onMouseMove);
    };

    const unbind = () => {
      scope.off("mouseenter", onMouseEnter);
      scope.off("mousemove", onMouseMove);
    };

    bind();

    return () => {
      unbind();
    };
  }, [images]);

  if (!randomized) {
    var photos = sessionStorage.getItem("photos");

    var returnedphotos = undefined;

    if (photos !== undefined && photos !== null) {
      returnedphotos = JSON.parse(photos);
    }
  }

  var { isLoading, isError, error, data } = useQuery(["users"], fetchData, {
    skip: photos !== undefined && photos !== null && !randomized,
  });

  if (!randomized) {
    if (!returnedphotos && data) {
      sessionStorage.setItem("photos", JSON.stringify(data));
    } else if (returnedphotos !== [] && returnedphotos) {
      data = returnedphotos;
      isLoading = false;
      isError = false;
    } else {
      data = [];
    }
    let temp = [];
    titles = [];

    data.map((datae) => {
      temp.push(datae.url);
      titles.push(datae.title);
    });

    images = [...temp];
  }

  if (isLoading) {
    return <div style={{ color: "white" }}>Data is loading...</div>;
  }
  if (isError) {
    return <div style={{ color: "white" }}>Error! {error.message}</div>;
  }

  //# Driver program to test above function.

  return (
    <>
      <div
        className="carousel"
        style={{
          border: "2px solid #73AD21",
          overflow: "hidden",
          position: "relative",
          width: "100%",
          cursor: "grab",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            padding: 0,
            margin: 0,
            whiteSpace: "nowrap",
            transition: "transform 0.2s ease",
          }}
        >
          {/* Render images */}
          {images.map((src, index) => (
            <li
              className="article"
              key={index}
              style={{
                display: "inline-block",
                flexShrink: 0,
                backgroundImage: `url(${src})`,
                height: "33.3%",
              }}
            >
              <h1
                className="box"
                style={{
                  color: "white",
                  width: "600px",
                  height: "600px",
                  objectFit: "cover",
                }}
              >
                {titles[index]}
              </h1>
              {/*<img
                src={src}
                alt={`Carousel Item ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              /> */}
            </li>
          ))}
        </ul>
      </div>
      <button
        style={{ position: "fixed" }}
        onClick={() => {
          // let pastimages = images;

          let arr = [...data];
          let n = arr.length;
          data = randomize(arr, n);

          let temp = [];
          titles = [];

          data.map((datae) => {
            temp.push(datae.url);

            titles.push(datae.title);
          });

          images = [...temp];
          randomized = true;

          forceUpdate();
        }}
      >
        Randomize{" "}
      </button>
    </>
  );
};

export default HoverCarousel;
