/* eslint-disable react/prop-types */
import React from "react";

const EventCard = ({ card }) => {
  console.log(card, card.image);
  const image = card.image ? card.image : "https://via.placeholder.com/400";
  console.log(image);

  return (
    <a
      href="#"
      className="p-8 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col"
    >
      <img
        src={image}
        alt="image"
        className="cardImg"
      />
      <div className="mt-8">
        <h4 className="font-bold text-xl">{card.name}</h4>
        <p className="mt-2 text-white-900">{card.description} </p>
        <div className="mt-5">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
          >
            Register
          </button>
        </div>
      </div>
    </a>
  );
};

export default EventCard;
