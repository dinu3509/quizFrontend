import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Header from "../components/Header";
import "react-circular-progressbar/dist/styles.css";

const SmallCircle = ({ value, text, sub, color }) => (
  <div className="flex flex-col items-center p-4">
    <div style={{ width: 120, height: 120 }}>
      <CircularProgressbar
        value={value}
        text={`${Math.round(value)}%`}
        styles={buildStyles({
          textSize: "18px",
          pathColor: color,
          textColor: "#fff",
          trailColor: "#2d2d2d",
          backgroundColor: "#1f1f1f",
        })}
      />
    </div>
    <div className="text-white mt-3 font-semibold text-lg">{text}</div>
    {sub !== undefined && <div className="text-gray-300 text-sm">{sub}</div>}
  </div>
);

const SubmittedQuiz = () => {
  const { score = 0, total = 0, accuracy = 0, wrong = 0 } = useLocation().state || {};
  const safeTotal = total === 0 ? 1 : total;

  const correctPercent = (score / safeTotal) * 100;
  const wrongPercent = (wrong / safeTotal) * 100;
  const accuracyPercent = Math.min(Math.max(accuracy, 0), 100);

  const getAccuracyColor = (percent) => {
    const r = percent < 50 ? 255 : Math.round(255 - ((percent - 50) * 255) / 50);
    const g = percent > 50 ? 255 : Math.round((percent * 255) / 50);
    return `rgb(${r}, ${g}, 0)`;
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex justify-center items-center flex-1 p-6">
        <div className="w-full max-w-5xl bg-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-10 space-y-10">
          <h1 className="text-5xl font-extrabold text-center text-indigo-500 mb-8">
            Quiz Results
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <SmallCircle
              value={correctPercent}
              text="Correct"
              sub={`${score}`}
              color="limegreen"
            />
            <SmallCircle
              value={wrongPercent}
              text="Wrong"
              sub={`${wrong}`}
              color="tomato"
            />
            <SmallCircle
              value={accuracyPercent}
              text="Accuracy"
              sub={`${Math.round(accuracyPercent)}%`}
              color={getAccuracyColor(accuracyPercent)}
            />
          </div>

          <div className="text-center mt-8">
            <NavLink
              to="/home"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition duration-300 shadow-lg"
            >
              Go to Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmittedQuiz;
