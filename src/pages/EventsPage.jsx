// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import EventCard from "../cards/EventCard.jsx";
// import { FaPlus } from "react-icons/fa";

// const randomCards = [
//   {
//     id: 1,
//     title: "Event 1",
//     date: "2024-08-01",
//     location: "Location 1",
//     image: "https://via.placeholder.com/400",
//   },
//   {
//     id: 2,
//     title: "Event 2",
//     date: "2024-08-05",
//     location: "Location 2",
//     image: "https://via.placeholder.com/400",
//   },
//   {
//     id: 3,
//     title: "Event 3",
//     date: "2024-08-10",
//     location: "Location 3",
//     image: "https://via.placeholder.com/400",
//   },
//   {
//     id: 4,
//     title: "Event 4",
//     date: "2024-08-15",
//     location: "Location 4",
//     image: "https://via.placeholder.com/400",
//   },
//   {
//     id: 5,
//     title: "Event 5",
//     date: "2024-08-20",
//     location: "Location 5",
//     image: "https://via.placeholder.com/400",
//   },
//   {
//     id: 6,
//     title: "Event 6",
//     date: "2024-08-25",
//     location: "Location 6",
//     image: "https://via.placeholder.com/400",
//   },
//   {
//     id: 7,
//     title: "Event 7",
//     date: "2024-08-30",
//     location: "Location 7",
//     image: "https://via.placeholder.com/400",
//   },
//   {
//     id: 8,
//     title: "Event 8",
//     date: "2024-09-05",
//     location: "Location 8",
//     image: "https://via.placeholder.com/400",
//   },
//   {
//     id: 9,
//     title: "Event 9",
//     date: "2024-09-10",
//     location: "Location 9",
//     image: "https://via.placeholder.com/400",
//   },
//   {
//     id: 10,
//     title: "Event 10",
//     date: "2024-09-15",
//     location: "Location 10",
//     image: "https://via.placeholder.com/400",
//   },
// ];

// const EventsPage = () => (
//   <div className="container mx-auto px-1 py-4 eventCard">
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//       {randomCards.map((card) => (
//         <EventCard key={card.id} card={card} />
//       ))}
//     </div>
//     <Link to="/create-event">
//     <button
//         className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center w-16 h-16"
//         title="Create New Event"
//       >
//         <FaPlus size={24} />
//       </button>
//     </Link>
//   </div>
// );

// export default EventsPage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../cards/EventCard.jsx";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const EventsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://192.168.155.213:8000/events/",
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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <>
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
      )}
    </div>
  );
};

export default EventsPage;
