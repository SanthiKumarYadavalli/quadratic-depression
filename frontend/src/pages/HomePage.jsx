/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!authUser) {
  //       navigate("/login");
  //     }
  //   }, [authUser, navigate]);

  //   if (!authUser) {
  //     return null;
  //   }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <video src="/bg.mp4" autoPlay loop muted playsInline></video>
    </div>
  );
};

export default HomePage;
