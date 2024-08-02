import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';

const EventCard = ({ card }) => {
  const [userData, setUserData] = useState({
    name: '',
    id: '',
    phone: '',
    email: '',
    branch: ''
  });
  const image = card.image;
  console.log(image);
  const fetchUser = async() => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/user/get/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchUser();

  const addParticipant = async () => {
    if(card.eligibility!='Everyone' && userData.branch!=card.eligibility){
      toast.error("You are Not Eligible");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API}/events/add-participant/${card.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Registered Successfully.");
    } catch (error) {
      console.log(error);
    }
  }

  const addVolunteer = async () => {
    if(card.eligibility!='Everyone' && userData.branch!=card.eligibility){
      toast.error("You are Not Eligible");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API}/events/add-volunteer/${card.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("added as Volunteer Successfully.");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='card p-8 border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50'>
      <Link to={`/event/${card.id}`}>
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
          <Link to={`/events`}>
            <button
              type="button"
              className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
              onClick={addParticipant}
            >
              Register
            </button>
          </Link>
          <Link to={`/events`}>
            <button

              type="button"
              className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
              onClick={addVolunteer}
            >
              Volunteer
            </button>
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
