import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loader from "../Components/Loader/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router";

export default function MyReviews() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-food-reviews?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/food-reviews/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setReviews(reviews.filter((r) => r._id !== id));
        toast.success("Review Deleted");
        setSelected(null);
      })
      .catch((err) => toast.error(err.message));
  };

  if (loading) return <Loader />;

  if (reviews.length === 0)
    return (
      <p className="text-center mt-40 text-white font-bold text-4xl">
        No Review Found
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        My Reviews
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-base-100/50">
        <table className="w-full text-left text-white min-w-max">
          <thead className="bg-base-100/50">
            <tr>
              <th className="p-4">Food</th>
              <th className="p-4">Restaurant</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((item) => (
              <tr
                key={item._id}
                className="border-b border-[#222] hover:bg-[#1a1a1a7f] transition"
              >
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={item.foodImage}
                    alt={item.foodName}
                    className="w-16 h-16 object-cover rounded-xl shadow-lg hover:scale-110 transition duration-300"
                  />
                  <span className="font-semibold">{item.foodName}</span>
                </td>

                <td className="p-4">{item.restaurantName}</td>
                <td className="p-4">{item.date}</td>

                <td className="p-4 flex justify-center gap-4">
                  <Link
                    to={`/edit-review/${item._id}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition shadow-md"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => setSelected(item)}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition shadow-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-base-100/50 p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Confirm Delete
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Are you sure you want to delete this review?
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleDelete(selected._id)}
                className="px-6 py-2 text-white font-semibold bg-red-600/70 hover:bg-red-700/70 rounded-xl shadow-md"
              >
                Confirm
              </button>

              <button
                onClick={() => setSelected(null)}
                className="px-6 py-2 text-white bg-gray-600 font-semibold hover:bg-gray-700 rounded-xl shadow-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
