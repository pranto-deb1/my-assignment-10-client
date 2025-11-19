import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const AllReviewCard = ({ review }) => {
  const { user } = useContext(AuthContext);
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

  const likedReview = {
    foodName: foodName,
    foodImage: foodImage,
    restaurantName: restaurantName,
    location: location,
    reviewerName: reviewerName,
    rating: rating,
    date: date,
    likedBy: user?.email,
  };

  const [favoriteReviews, setFavoriteReviews] = useState([]);
  const [liked, setLiked] = useState(false);

  const fetchFavoriteReviews = () => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-favorite-reviews?email=${user.email}`, {
        headers: {
          authorization: `bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFavoriteReviews(data);
        })
        .catch((err) => {
          toast.error(err.code || "Failed to fetch favorites");
        });
    }
  };

  useEffect(() => {
    fetchFavoriteReviews();
  }, [user]);

  useEffect(() => {
    const isFavorite = favoriteReviews.some(
      (data) =>
        data.foodName === foodName &&
        data.location === location &&
        data.date == date
    );

    setLiked(isFavorite);
  }, [favoriteReviews, foodName, location, date]);

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

  const handleLike = () => {
    if (!user) {
      toast.error("Please log in to add to favorites.");
      return;
    }

    if (liked) {
      toast.error("Review already liked.");
      return;
    }

    fetch("http://localhost:3000/favorite-reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${user.accessToken}`,
      },
      body: JSON.stringify(likedReview),
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(true);

        const newFavorite = { ...likedReview, _id: data.insertedId };
        setFavoriteReviews([...favoriteReviews, newFavorite]);

        toast.success("Successfully added to favorite list");
      })
      .catch(() => {
        toast.error("Failed to add to favorite list");
      });
  };

  const handleUnlike = () => {
    const reviewToRemove = favoriteReviews.find(
      (data) => data.foodName === foodName
    );

    if (!liked) {
      toast.error("This review is not currently liked.");
      return;
    }

    if (reviewToRemove?._id) {
      fetch(`http://localhost:3000/favorite-reviews/${reviewToRemove._id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${user.accessToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              throw new Error(err.message || "Failed to delete");
            });
          }

          return res.text().then((text) => (text ? JSON.parse(text) : {}));
        })
        .then(() => {
          setLiked(false);

          const updatedFavorites = favoriteReviews.filter(
            (data) => data._id !== reviewToRemove._id
          );
          setFavoriteReviews(updatedFavorites);

          toast.success("Successfully unliked");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to remove from favorite list");
        });
    } else {
      toast.error("Review ID not found in favorites list state.");
    }
  };

  return (
    <div className="tilt-wrapper relative">
      <div
        ref={cardRef}
        className="card appear-2 transform-3d will-change-transform bg-base-100/30 backdrop-blur-md shadow-lg rounded-xl border border-white/40 transition-all duration-200 ease-out relative"
      >
        <button
          onClick={() => {
            if (liked) {
              handleUnlike();
            } else {
              handleLike();
            }
          }}
          className="absolute bottom-20 right-3 text-red-500 text-2xl z-10"
        >
          {liked ? (
            <AiFillHeart className="text-red-600" />
          ) : (
            <AiOutlineHeart />
          )}
        </button>

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
