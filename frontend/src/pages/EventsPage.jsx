import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../cards/EventCard.jsx";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import toast from "react-hot-toast";

const EventsPage = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingEvents,setUpcomingEvents]=useState([]);
  const [ongoingEvents,setOngoingEvents]=useState([]);
  const [completedEvents,setCompletedEvents]=useState([]);
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API}/events/upcoming`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Upcoming Events");
        setUpcomingEvents(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchUpcomingEvents();

    const fetchOngoingEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API}/events/ongoing`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Ongoing Events");
        setOngoingEvents(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchOngoingEvents();

    const fetchCompletedEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API}/events/ended`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Completed Events");
        setCompletedEvents(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchCompletedEvents();
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

      <h1 className="text-4xl mb-2">Ongoing Events</h1>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ongoingEvents.length>0?(ongoingEvents.map((card) => (
          <EventCard key={card.id} card={card} />
        ))):(<p className="text-white-300">No Events to display</p>)}
      </div>

      <h1 className="text-4xl mb-6">Upcoming Events</h1>
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {upcomingEvents.length>0?(upcomingEvents.map((card) => (
          <EventCard key={card.id} card={card} />
        ))):(<p className="text-white-300">No Events to display</p>)}
      </div>

      <h1 className="text-4xl mb-6">Completed Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {completedEvents.length>0?(completedEvents.map((card) => (
          <EventCard key={card.id} card={card} />
        ))):(<p className="text-white-300">No Events to display</p>)}
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
