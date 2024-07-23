import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateEventPage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  // This effect will run when `imageUrl` changes and will reload the page
  useEffect(() => {
    if (imageUrl) {
      // To ensure the page reloads after image URL is set
      window.location.reload();
    }
  }, [imageUrl]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDateTime: "",
    category: "",
    eligibility: "",
    venue: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function generateName(e) {
    e.preventDefault();
    console.log(1);
    console.log(formData.description);

    const url = "http://192.168.155.213:8000/events/get-ai-name/";
    const payload = {
      prompt: formData.description,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Api-Version": "v1",
      Accept: "application/json",
      Authorization:
        "Bearer lmwr_sk_KDYogPbbB6_ionFslmdFUaacvEDMP9cGATbQ3inS7WLmAm3b",
    };

    try {
      // const response = await fetch(url, {
      //   method: "POST",
      //   body: JSON.stringify(payload),
      // });

      const response = await axios.post(url, payload);

      // const data = await response;

      // setName(data.name);
      console.log(response);
      console.log(response.name);
      document.getElementById("name").value = response.data.name;
    } catch (error) {
      console.error("Error generating name:", error);
      throw error; // Re-throw the error for handling in the calling code
    }
  }

  async function generateImage(e) {
    e.preventDefault();
    console.log(1);
    console.log(formData.description);

    const url = "http://192.168.155.213:8000/events/get-ai-img/";
    const payload = {
      prompt: formData.description,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Api-Version": "v1",
      Accept: "application/json",
      Authorization:
        "Bearer lmwr_sk_KDYogPbbB6_ionFslmdFUaacvEDMP9cGATbQ3inS7WLmAm3b",
    };

    try {
      // const response = await fetch(url, {
      //   method: "POST",
      //   body: JSON.stringify(payload),
      // });

      const response = await axios.post(url, payload);

      // const data = await response;

      console.log(response);
      console.log(response.url);
      setImageUrl(response.url);
    } catch (error) {
      console.error("Error generating Image:", error);
      throw error; // Re-throw the error for handling in the calling code
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://192.168.155.213:8000/events/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjusted for JSON data
          },
        }
      );
      if (response.status === 201) {
        toast.success("Event created successfully!");
        navigate("/events");
      } else {
        toast.error("Failed to create event. Please try again!");
      }
    } catch (error) {
      console.error("Event Creation Error:", error);
      toast.error("Something went wrong. Please try again");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="w-full max-w-5xl bg-gray-800 p-12 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Create New Event
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-white mb-2 text-sm font-medium"
              htmlFor="description"
            >
              Event Description
            </label>
            <textarea
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="description"
              name="description"
              onChange={handleChange}
              value={formData.description}
              rows="4"
              required
            />
          </div>

          <button className="bg-blue-600" type="submit" onClick={generateName}>
            Generate Name
          </button>
          <br></br>
          <button className="bg-blue-600" type="submit" onClick={generateImage}>
            Generate Photo
          </button>

          <img src={imageUrl}/>

          <div className="mb-4">
            <label
              className="block text-white mb-2 text-sm font-medium"
              htmlFor="name"
            >
              Event Name
            </label>
            <input
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-white mb-2 text-sm font-medium"
              htmlFor="startDateTime"
            >
              Start Date and Time
            </label>
            <input
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="datetime-local"
              id="startDateTime"
              name="start_time"
              value={formData.startDateTime}
              onChange={handleChange}
              // required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-white mb-2 text-sm font-medium"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              // required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="academics">Academics</option>
              <option value="cultural">Cultural</option>
              <option value="competitive">Competitive</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-white mb-2 text-sm font-medium"
              htmlFor="eligibility"
            >
              Eligibility
            </label>
            <select
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="eligibility"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              // required
            >
              <option value="puc1">PUC1</option>
              <option value="puc2">PUC2</option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
              <option value="eee">EEE</option>
              <option value="mech">Mech</option>
              <option value="civil">Civil</option>
              <option value="che">CHE</option>
              <option value="mme">MME</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-white mb-2 text-sm font-medium"
              htmlFor="venue"
            >
              Venue
            </label>
            <input
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              // required
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            type="submit"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
