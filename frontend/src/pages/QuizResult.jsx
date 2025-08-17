import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import Header from '../components/Header';

const QuizResult = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ hook for navigation
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8080/results/${id}`, {
          headers: { Authorization: token },
        });
        console.log("Result:", res.data[0]);
        setQuiz(res.data[0]);
      } catch (err) {
        console.error("Error fetching result:", err.message);
      }
    };
    fetchResult();
  }, [id]);

  if (!quiz) {
    return (
      <div className="bg-black min-h-screen flex justify-center items-center text-white">
        Loading Results...
      </div>
    );
  }

  const { questions = [], selected = {} } = quiz;
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      <div className="max-w-screen-lg mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>

        {/* ✅ Back Button */}
        <button
          onClick={() => navigate(-1)} // goes to previous page
          className="mb-6 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          ⬅ Back
        </button>

        {questions.map((q, index) => {
          const userAnswer = selected[index] || null;
          const isCorrect = userAnswer === q.answer;

          return (
            <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-800">
              <h3 className="font-bold text-lg mb-3">
                Q{index + 1}. {q.question}
              </h3>

              <div className="flex flex-col gap-2">
                {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => {
                  const isOptCorrect = opt === q.answer;
                  const isOptSelected = userAnswer === opt;

                  let optionClass = "px-3 py-2 rounded cursor-default";
                  if (isOptSelected && isOptCorrect) {
                    optionClass += " bg-green-500 text-white";
                  } else if (isOptSelected && !isOptCorrect) {
                    optionClass += " bg-red-500 text-white";
                  } else if (!isOptSelected && isOptCorrect) {
                    optionClass += " bg-green-500 text-white";
                  } else {
                    optionClass += " bg-gray-700";
                  }

                  return (
                    <div key={i} className={optionClass}>
                      {optionLabels[i]}. {opt}
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 text-sm">
                {userAnswer ? (
                  isCorrect ? (
                    <span className="text-green-400">
                      ✅ You selected: {userAnswer} (Correct)
                    </span>
                  ) : (
                    <span className="text-red-400">
                      ❌ You selected: {userAnswer} (Wrong). Correct Answer: {q.answer}
                    </span>
                  )
                ) : (
                  <span className="text-yellow-400">
                    ⚠️ You did not select any option. Correct Answer: {q.answer}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizResult;
