import { useNavigate } from "react-router-dom";
import React from "react";

const HotTopics = () => {
  const navigate = useNavigate();

const topics = [
  "Artificial Intelligence",
  "Cyber Security",
  "Blockchain",
  "Data Science",
  "Cloud Computing",
  "Data Structures & Algorithms",
  "Web Development",
  "Database Systems",
  "Python Programming",
  "Operating Systems",
  "Computer Networks",
  "Machine Learning"
];

  const handleTopicClick = (topic) => {
    navigate("/createquiz", { state: { topic } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10">
        🔥 Hot Topics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((t, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer overflow-hidden rounded-2xl shadow-2xl group transform transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50"
            onClick={() => handleTopicClick(t)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative p-8 flex flex-col items-center justify-center bg-gray-800 text-white h-40 rounded-2xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-center">{t}</h2>
              <p className="mt-2 text-sm text-gray-200 text-center">
                Click to create a quiz on this topic
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotTopics;
