import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import VolunteerCard from "../cards/VolunteerCard";

const EventDetails = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [volunteers, setVolunteers] = useState([]);


    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/events/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setEvent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setLoading(false);
            }
        };
        fetchEvent();
        const fetchVolunteers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/events/volunteers/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setVolunteers(response.data);
                setLoading(false);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching volunteer details:', error);
                setLoading(false);
            }
        }
        fetchVolunteers();
    }, [id]);
    if (loading) {
        return (
            <div className="loader">
                <video src="/bg_home.mp4" autoPlay loop muted playsInline></video>
                <Triangle
                    visible={true}
                    height="80"
                    width="80"
                    color="rgba(165, 180, 252,1)"
                    ariaLabel="triangle-loading"
                />
            </div>
        );
    }
    if (!event) {
        return <p>Event not found</p>;
    }
    return (
        <>
            <video src="/bg_home.mp4" autoPlay loop muted playsInline></video>
            <div>
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full mb-6"
                />
                <h1 className="text-4xl text-white-100">{event.name}</h1>
                <p className="text-lg mb-4"> Welcome to event {event.name}. We are excited to present you this event.</p>
                <p className="text-lg mb-4">The details of this event are disclosed below.Please go through these details. Your participation in this event is highly appreciated.</p>
                <div className="mb-8 p-6 min-w-lg mx-auto bg-white shadow-md rounded-lg">
                    <ul className="space-y-4 text-gray-700">
                        <li className="text-xl font-semibold">Name: <span className="font-normal">{event.name}</span></li>
                        <li className="text-xl font-semibold">Description: <span className="font-normal">{event.description}</span></li>
                        <li className="text-xl font-semibold">Start Date and Time: <span className="font-normal">{event.start_time}</span></li>
                        <li className="text-xl font-semibold">End Date and Time: <span className="font-normal">{event.end_time}</span></li>
                        <li className="text-xl font-semibold">Category: <span className="font-normal">{event.category}</span></li>
                        <li className="text-xl font-semibold">Eligibility: <span className="font-normal">{event.eligibility}</span></li>
                        <li className="text-xl font-semibold">Venue: <span className="font-normal">{event.venue}</span></li>
                    </ul>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-white-900 text-white">Volunteer Details</h2>
                    <div className='card-container'>
                        {volunteers.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {volunteers.map((card) => (
                                    <VolunteerCard key={card.id} card={card} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-white-300">No Volunteers to show.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetails;