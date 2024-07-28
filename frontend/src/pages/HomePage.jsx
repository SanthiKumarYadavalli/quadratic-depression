/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //   useEffect(() => {
  //     if (!authUser) {
  //       navigate("/login");
  //     }
  //   }, [authUser, navigate]);

  //   if (!authUser) {
  //     return null;
  //   }

  useEffect(() => {
    const checkScreenSize = () => {
      return window.matchMedia("(max-width: 768px)").matches;
    };

    setIsMobileMenuOpen(checkScreenSize());

    const handleResize = () => {
      setIsMobileMenuOpen(checkScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className='video-container'>
        {isMobileMenuOpen ? (
          <div className="relative min-h-screen flex items-center justify-center">
            <video src="/bg_mobile.mp4" autoPlay loop muted playsInline></video>
          </div>
        ) : (
          <div className="relative min-h-screen flex items-center justify-center">
            <video src="/bg.mp4" autoPlay loop muted playsInline></video>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
