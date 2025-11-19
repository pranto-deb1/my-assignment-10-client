import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loader from "../Components/Loader/Loader";
import { toast } from "react-toastify";
import AllReviewCard from "../Components/AllReviewCard";

const LikedReview = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [favoriteReviews, setFavoriteReviews] = useState([]);

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
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.code || "Failed to fetch favorites");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchFavoriteReviews();
  }, [user]);

  console.log(favoriteReviews);

  if (loading) return <Loader></Loader>;
  return (
    <div className="mx-auto w-10/12 xl:w-8/12">
      <p className=""></p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 gap-y-20 my-14 slide-1">
        {favoriteReviews.map((review) => (
          <AllReviewCard review={review}></AllReviewCard>
        ))}
      </div>
    </div>
  );
};

export default LikedReview;
