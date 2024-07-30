/* eslint-disable react/prop-types */
import React from "react";

const EventCard = ({ card }) => {
  console.log(card, card.image);
  const image = card.image ? card.image : "https://via.placeholder.com/400";
  console.log(image);

  return (
    <div className='card p-8 border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50'>
      <a href="#">
        <img
          src={image}
          alt="image"
          className="cardImg"
        />
        <div className="card-data mt-8 ">
          <h4 className="font-bold text-xl">{card.name}</h4>
          <p className="mt-2 text-white-900">{card.description} </p>
        </div>
        <div className="card-btns mt-5 flex justify-between">
          <button
            type="button"
            className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
          >
            Register
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
          >
            Volunteer
          </button>
        </div>
      </a>
    </div>
  );
};

export default EventCard;
