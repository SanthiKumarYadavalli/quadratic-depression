import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateEventPage = () => {
  const [selectedOption, setSelectedOption] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageType: "",
    fileUpload:null,
    startDateTime: "",
    category: "",
    eligibility: "",
    venue: "",
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFormData({
      ...formData,
      fileUpload: event.target.files[0],
    });
  }
  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      startDateTime: event.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  async function generateName(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API}/events/get-ai-name/`;
    const payload = {
      prompt: formData.description,
    };

    try {
      const response = await axios.post(url, payload);
      document.getElementById("name").value = response.data.name;
      formData.name = response.data.name;
    } catch (error) {
      console.error("Error generating name:", error);
      throw error;
    }
  }
  const handleUpload = (e) => {
    formData.fileUpload=selectedFile;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOption === 'upload') {
      formData.imageType = 'upload';
      formData.fileUpload = selectedFile; // Attach selected file to formData
    } else {
      formData.imageType = 'generate';
    }
    console.log(formData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API}/events/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
      <div className="w-full max-w-2xl bg-gray-800 p-6 sm:p-12 rounded-lg shadow-lg border border-gray-700">
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

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            type="button"
            onClick={generateName}
          >
            Generate Name
          </button>
          <br></br>

          <div className="mb-4">
            <label
              className="block text-white mb-2 text-sm font-medium"
              htmlFor="name">
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
          <div className='mb-4'>
            <label
              className="block text-white mb-2 text-sm font-medium"
              htmlFor="image">
              Image
            </label>
            <input
              type="radio"
              id="uploadOption"
              name="image"
              value="upload"
              checked={selectedOption === "upload"}
              onChange={handleOptionChange}
            />
            <label htmlFor="uploadOption">Upload a file</label>
            &ensp;&ensp;
            <input
              type="radio"
              id="uploadOption"
              name="image"
              value="generate"
              checked={selectedOption === "generate"}
              onChange={handleOptionChange}
            /><label htmlFor="uploadOption" >Generate With AI</label>
          </div>
          {selectedOption === 'upload' && (
            <div className="mb-4">
              <input
                type="file"
                id="fileUpload"
                name="fileUpload"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-white mb-2 text-sm font-medium"
              htmlFor="startDateTime"
            >
              Select Date and Time:
            </label>
            <input
              type="datetime-local"
              id="startDateTime"
              name="startDateTime"
              value={selectedDateTime}
              onChange={handleDateTimeChange}
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <option disabled>Select Year of Study</option>
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
