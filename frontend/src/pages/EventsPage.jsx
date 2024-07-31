import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../cards/EventCard.jsx";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import toast from "react-hot-toast";

const EventsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API}/events/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("No Network");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <video className="video-background__video" src="/bg_home.mp4" autoPlay loop muted playsInline></video>
        <div className="loader">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="rgba(165, 180, 252,1)"
            ariaLabel="triangle-loading"
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <video className="video-background__video" src="/bg_home.mp4" autoPlay loop muted playsInline></video>
      </div>

      <h1 className="text-4xl mb-6">Events for You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((card) => (
          <EventCard key={card.id} card={card} />
        ))}
      </div>
      <Link to="/create-event">
        <button
          className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center w-16 h-16"
          title="Create New Event"
        >
          <FaPlus size={24} />
        </button>
      </Link>
    </>
  );
};

export default EventsPage;
