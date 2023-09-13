import React, { useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
async function fetchData() {
  const { data } = await axios.get(
    "http://jsonplaceholder.typicode.com/photos"
  );
  return data;
}

const HoverCarousel = () => {
  var images = [
    "https://www.nationsonline.org/map_small/afghanistan_small_map.jpg",
    "https://www.nationsonline.org/map_small/afghanistan_small_map.jpg",
    "https://www.nationsonline.org/map_small/afghanistan_small_map.jpg",
    "https://www.nationsonline.org/map_small/afghanistan_small_map.jpg",
    "https://www.nationsonline.org/map_small/afghanistan_small_map.jpg",
  ];

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

  const { isLoading, isError, error, data } = useQuery(["users"], fetchData);
  if (isLoading) {
    return <div>Data is loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }
  data.map((datae) => {
    images.push(datae.url);
  });

  return (
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
            key={index}
            style={{ display: "inline-block", width: "33.33%", flexShrink: 0 }}
          >
            <img
              src={src}
              alt={`Carousel Item ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HoverCarousel;
