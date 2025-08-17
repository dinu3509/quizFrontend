import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import useAuthCheck from "../components/UseAuthCheck";

const Home = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [loggedUser, setLoggedUser] = useState("");

  // ✅ Runs token check automatically
  useAuthCheck("token", "/login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setLoggedUser(user);

    if (token) {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      axios
        .get(`${BASE_URL}profile/image`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setProfileImage(res.data.image);
        })
        .catch(() => console.log("No profile image"));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="bg-black/30 min-h-screen">
        <Header profileImage={profileImage} loggedUser={loggedUser} />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Home;
