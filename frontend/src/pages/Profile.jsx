import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const im = localStorage.getItem('profileImage')
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/profile/info", {
          headers: { Authorization: token },
        });

        if (res.data) {
          setName(res.data.name || "");
          setEmail(res.data.email || "");
          setPhone(res.data.phone || "");
          if (res.data.dob) {
    const formattedDob = new Date(res.data.dob).toISOString().split("T")[0];
    setDob(formattedDob);
  }
          if (res.data.image) setPreview(res.data.image); 
        }
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("file", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("dob", dob);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8080/profile/info", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      if (res.data.image) {
      localStorage.removeItem("profileImage");
      localStorage.setItem("profileImage", res.data.image);
      setPreview(res.data.image); // update state too
    }
      setMessage(res.data.message || "Profile updated successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Save failed");
    }
  };

  return (
    <div className="bac min-h-screen">
      <Header />
      <div className="max-w-screen-md mx-auto my-5 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

        {/* Profile photo preview */}
        <div className="flex flex-col items-center mb-6">
          {im || preview ? (
            <img
              src={`${preview?preview:im}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border shadow-md mb-3"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 mb-3">
              No Photo
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>

        {/* Profile info form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="border px-3 py-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3"
          >
            Save
          </button>
        </form>

        {message && <p className="mt-3 text-green-600 font-semibold">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
