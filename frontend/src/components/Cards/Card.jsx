import React from 'react';
import { Link } from 'react-router-dom';
import WordCloud from '../WordCloud';
import { useNavigate } from 'react-router-dom';

// ✅ Card Component
const Card = (props) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={props.path}>
        <img
          className="rounded-t-lg w-full h-50 object-fit"
          src={props.image}
          alt=""
        />
      </Link>
      <div className="p-5">
        <Link to={props.path}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.msg}
        </p>
        <Link
          to={props.path}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {props.btnMsg}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

// ✅ HotCard Component
const HotCard = (props) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={props.path}>
        <div className="rounded-t-lg w-full h-50 object-fit">
          <WordCloud />
        </div>
      </Link>
      <div className="p-5">
        <Link to={props.path}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.msg}
        </p>
        <Link
          to={props.path}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {props.btnMsg}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
const HisCard = ({ topic, score, total, accuracy, date,quizId }) => {
  const navigate = useNavigate();
  const handleClick=(quizId)=>{
    
    navigate(`/history/${quizId}`);
  }
  return (
    <div className="w-full  bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col gap-3 border border-gray-200 dark:border-gray-700 cursor-pointer" onClick={() => handleClick(quizId)}>
      {/* Topic */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
        {topic || "No Topic"}
      </h2>

      {/* Score & Accuracy */}
      <div className="flex flex-wrap justify-between text-gray-700 dark:text-gray-300">
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Score:</span> {score}/{total}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Accuracy:</span> {accuracy}%
        </p>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium">Date:</span> {date}
      </p>
    </div>
  );
};
// ✅ Export both components
export { Card, HotCard,HisCard };
