import React, { useEffect, useRef } from "react";
import { Link } from "react-router";

const AllReviewCard = ({ review }) => {
  const {
    _id,
    foodName,
    foodImage,
    restaurantName,
    location,
    reviewerName,
    rating,
    date,
  } = review;

  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const rotateX = (deltaY / height) * 20;
      const rotateY = (deltaX / width) * 20;

      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  return (
    <div className="tilt-wrapper">
      <div
        ref={cardRef}
        className="card appear-2 transform-3d will-change-transform bg-base-100/30 backdrop-blur-md shadow-lg rounded-xl border border-white/40 transition-all duration-200 ease-out"
      >
        <figure className="h-48 overflow-hidden rounded-t-xl">
          <img
            src={foodImage}
            alt={foodName}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body p-5">
          <h2 className="text-xl font-bold text-orange-600">{foodName}</h2>

          <p className="text-[15px]">
            <span className="font-semibold">Restaurant:</span> {restaurantName}
          </p>

          <p className="text-[15px]">
            <span className="font-semibold">Location:</span> {location}
          </p>

          <p className="text-[15px]">
            <span className="font-semibold">Reviewer:</span> {reviewerName}
          </p>

          <p className="text-[15px]">
            <span className="font-semibold">Date:</span> {date}
          </p>

          <p className="text-[15px] font-semibold text-yellow-600">
            ⭐ {rating}/5
          </p>

          <div className="mt-3">
            <Link
              to={`/Review-Detail/${_id}`}
              className="btn bg-linear-to-r from-orange-400 to-red-500 text-white w-full rounded-full"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReviewCard;
