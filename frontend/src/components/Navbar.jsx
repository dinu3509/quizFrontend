import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const items = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Quiz", path: "/createquiz" },
  ];

  const [profileImage, setProfileImage] = useState(null);
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  const toggleState = () => setState(!state);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");
Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("quizToken_") || key.startsWith("submitted-")) {
      localStorage.removeItem(key);
    }
  });
    navigate("/login");
  };

  const loggedUser = localStorage.getItem("user"); // optional: for initials

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    } else {
      const token = localStorage.getItem("token");
      if (!token) return;
const BASE_URL = import.meta.env.VITE_BASE_URL;
      axios
        .get(`${BASE_URL}profile/image`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          // convert base64 buffer from server to usable src
          console.log("Full response:", res);
          console.log("Response data:", res.data);
          setProfileImage(res.data.image);
          localStorage.setItem("profileImage", res.data.image); // store in localStorage
        })
        .catch((err) => console.log("No profile image found", err));
    }
  }, []);

  return (
    <div className="items-center flex gap-3">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mx-auto"
      >
        Logout
      </button>

      <div className="relative">
        <button
          className="h-10 w-10 lg:h-16 lg:w-16 bg-gray-200 rounded-full overflow-hidden cursor-pointer flex items-center justify-center"
          onClick={toggleState}
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-700 font-bold text-lg">
              {loggedUser?.[0]?.toUpperCase()}
            </span>
          )}
        </button>

        {state && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 backdrop-blur-md shadow-md rounded-lg py-2 bg-white flex flex-col z-20">
            {items.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="px-4 py-2 rounded-xl hover:bg-gray-400 cursor-pointer text-black text-center"
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
