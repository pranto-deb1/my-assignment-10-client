import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Loader from "../Components/Loader/Loader";

const EditReview = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [oldData, setOldData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/food-reviews/${id}`, {
      headers: {
        authorization: `bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOldData(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  }, [id, user]);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (oldData) {
      setFormData({
        foodName: oldData.foodName || "",
        foodImage: oldData.foodImage || "",
        restaurantName: oldData.restaurantName || "",
        location: oldData.location || "",
        rating: oldData.rating || "",
        reviewText: oldData.reviewText || "",
        reviewerName: user.displayName,
        reviewerEmail: user.email,
      });
    }
  }, [oldData, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://localhost:3000/food-reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${user.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("successfully updated review");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl mx-auto bg-base-100/50 backdrop-blur-sm shadow-xl rounded-2xl p-8 space-y-8 border border-amber-200"
      >
        <h2 className="text-4xl font-bold text-center text-amber-800 tracking-wider border-b pb-4 border-amber-100">
          ✨ Update review
        </h2>

        <style>
          {`
      .clean-input-group {
        @apply space-y-2;
      }
      .clean-input-label {
        @apply block text-sm font-semibold text-amber-700;
      }
      .clean-input-field {
        @apply w-full px-4 py-3 rounded-lg border-b-2 border-amber-100 bg-white 
        focus:ring-2 focus:ring-amber-300 focus:border-amber-400 focus:outline-none 
        text-gray-700 shadow-sm transition-all duration-150 placeholder:text-gray-400;
      }
    `}
        </style>

        <fieldset className="p-4 border border-amber-100 rounded-lg space-y-5">
          <legend className="px-2 text-lg font-bold text-amber-700">
            🍔 Food Information
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="clean-input-group">
              <label htmlFor="foodName" className="clean-input-label">
                Food Name
              </label>
              <input
                id="foodName"
                type="text"
                name="foodName"
                placeholder="Pizza, Burger..."
                className="clean-input-field input"
                value={formData.foodName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="clean-input-group">
              <label htmlFor="foodImage" className="clean-input-label">
                Photo Link (URL)
              </label>
              <input
                id="foodImage"
                type="url"
                name="foodImage"
                placeholder="https://image.url"
                className="clean-input-field input"
                value={formData.foodImage}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="clean-input-group">
              <label htmlFor="restaurantName" className="clean-input-label">
                Restaurant Name
              </label>
              <input
                id="restaurantName"
                type="text"
                name="restaurantName"
                placeholder="Sultan's Dine, KFC"
                className="clean-input-field input"
                value={formData.restaurantName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="clean-input-group">
              <label htmlFor="location" className="clean-input-label">
                Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="Dhanmondi, Dhaka"
                className="clean-input-field input"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="p-4 border border-amber-100 rounded-lg space-y-5">
          <legend className="px-2 text-lg font-bold text-amber-700">
            ⭐ Your Opinion
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="clean-input-group">
              <label htmlFor="rating" className="clean-input-label">
                Rating (1 - 5)
              </label>
              <input
                id="rating"
                type="number"
                name="rating"
                placeholder="Like: 4.5"
                className="clean-input-field input"
                value={formData.rating}
                min="1"
                max="5"
                step="0.1"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="clean-input-group">
            <label htmlFor="reviewText" className="clean-input-label">
              Write Full Review:
            </label>
            <textarea
              id="reviewText"
              name="reviewText"
              placeholder="Complete Review..."
              className="clean-input-field h-32 w-full resize-none border border-amber-100 p-3 rounded-xl"
              value={formData.reviewText}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full buttonPrimery text-white py-3 rounded-lg text-xl font-bold shadow-md shadow-amber-300/50 transition-all duration-300"
        >
          Update Review
        </button>
      </form>
    </div>
  );
};

export default EditReview;
