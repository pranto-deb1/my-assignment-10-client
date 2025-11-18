import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../Components/Loader/Loader";
import { AuthContext } from "../Provider/AuthProvider";
const ReviewDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  // console.log(user);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/food-reviews/${id}`, {
      headers: {
        authorization: `bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
        // console.log(d);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, user.accessToken]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!data) return <p>No Review Found</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 sm:p-6">
      <div className="bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/30 transition duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
        <div className="relative group h-[380px] overflow-hidden rounded-b-3xl">
          <img
            src={data.foodImage}
            alt={data.foodName}
            className="w-full h-full object-cover transition duration-900 scale-100 group-hover:scale-110 "
          />

          <div className="absolute top-5 right-5 bg-yellow-300/90 text-black font-semibold px-5 py-2 rounded-full text-xl shadow-xl scale-100 group-hover:scale-110 transition-all ">
            ⭐ {data.rating}
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <h1 className="text-4xl font-extrabold mb-4 tracking-wide animate-fadeIn">
            {data.foodName}
          </h1>

          <p className="text-gray-700 text-lg mb-1">
            <span className="font-semibold">Restaurant:</span>{" "}
            {data.restaurantName}
          </p>

          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Location:</span> {data.location}
          </p>

          <p className="mt-7 text-gray-900 leading-relaxed text-xl">
            {data.reviewText}
          </p>

          <div className="mt-10 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
            <h2 className="text-xl font-bold mb-2">👤 Reviewer Info</h2>

            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {data.reviewerName}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {data.reviewerEmail}
            </p>

            <p className="text-gray-600 text-sm mt-2">
              Reviewed on: {new Date(data.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
