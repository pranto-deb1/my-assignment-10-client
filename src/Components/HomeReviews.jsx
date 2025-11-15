import React, { useEffect, useState } from "react";
import HomeReviewCard from "./HomeReviewCard";

const HomeReviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/top-food-reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="mx-auto w-10/12 xl:w-8/12 my-[300px]">
      <h2 className="text-6xl font-bold text-center mb-[100px]">
        Top Rated Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 gap-y-20 my-14">
        {reviews.map((review) => (
          <HomeReviewCard review={review}></HomeReviewCard>
        ))}
      </div>
    </div>
  );
};

export default HomeReviews;
