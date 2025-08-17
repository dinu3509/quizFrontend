import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Utility to shuffle array
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const WriteQuiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { topic } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [canAttempt, setCanAttempt] = useState(false);

  const handleOptionChange = (questionIndex, selectedOption) => {
    if (submitted || alreadySubmitted) return;
    setSelected(prev => ({ ...prev, [questionIndex]: selectedOption }));
  };

  useEffect(() => {
    const checkSubmission = async () => {
      try {
        const quizToken = localStorage.getItem(`quizToken_${id}`);
        const res = await axios.get(`http://localhost:8080/writequiz/${id}/check-submission`, {
          headers: { Authorization: quizToken },
        });

        if (res.data.submitted) {
          setAlreadySubmitted(true);
          navigate('/quiz-submitted', {
            state: { message: 'You already submitted this quiz.' }
          });
        } else {
          setCanAttempt(true);
        }
      } catch (err) {
        console.error('Failed to check submission:', err);
      } finally {
        setLoading(false);
      }
    };
    checkSubmission();
  }, [id, navigate]);

  useEffect(() => {
    if (!canAttempt) return;

    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const quizToken = localStorage.getItem(`quizToken_${id}`);
        const res = await axios.get(`http://localhost:8080/writequiz/${id}`, {
          headers: { Authorization: quizToken }
        });

        const quizData = res.data.quiz;

        // Shuffle options for each question
        const shuffledQuestions = quizData.questions.map(q => {
          const opts = [
            { text: q.option1, isCorrect: q.option1 === q.answer },
            { text: q.option2, isCorrect: q.option2 === q.answer },
            { text: q.option3, isCorrect: q.option3 === q.answer },
            { text: q.option4, isCorrect: q.option4 === q.answer },
          ];
          return {
            ...q,
            options: shuffleArray(opts) // shuffled options
          };
        });

        setQuestions(shuffledQuestions);

        // Store correct answers for scoring
        setAnswers(shuffledQuestions.map(q => q.options.find(opt => opt.isCorrect).text));

        // Initialize selected
        const initialSelected = {};
        shuffledQuestions.forEach((_, index) => initialSelected[index] = null);
        setSelected(initialSelected);

        // Timer
        const decoded = jwtDecode(quizToken);
        const expiry = decoded.exp * 1000;
        const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
        setTimeLeft(remaining);

        const interval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              handleSubmit();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(interval);
      } catch (err) {
        console.error('Failed to fetch quiz', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, canAttempt]);

  const handleSubmit = async () => {
    if (submitted || alreadySubmitted) return;
    setSubmitted(true);

    let correctCount = 0;
    let attempted = 0;

    questions.forEach((q, index) => {
      if (selected[index] !== null) {
        attempted++;
        const correctOption = q.options.find(opt => opt.isCorrect).text;
        if (selected[index] === correctOption) correctCount++;
      }
    });

    const calculatedAccuracy = attempted > 0 ? (correctCount / attempted) * 100 : 0;

    try {
      const quizToken = localStorage.getItem(`quizToken_${id}`);
      await axios.post('http://localhost:8080/writequiz/result', {
        quizId: id,
        score: correctCount,
        wrong: attempted - correctCount,
        total: questions.length,
        accuracy: calculatedAccuracy,
        topic,
        selected,
        answers,
        questions
      }, { headers: { Authorization: quizToken } });

      localStorage.setItem(`submitted-${id}`, 'true');

      navigate('/quiz-submitted', {
        state: {
          quizId: id,
          wrong: attempted - correctCount,
          topic,
          score: correctCount,
          total: questions.length,
          accuracy: calculatedAccuracy
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading quiz...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex justify-center p-6">
      <div className="w-full max-w-screen-2xl bg-white text-gray-900 shadow-2xl rounded-2xl p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-indigo-600">{topic} Quiz</h2>
          {timeLeft !== null && (
            <div className="text-lg font-semibold text-red-600 bg-red-50 px-4 py-2 rounded-lg shadow">
              ⏳ {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
            </div>
          )}
        </div>

        {questions.map((q, index) => (
          <div className="p-5 border rounded-xl shadow-md bg-gray-50" key={index}>
            <h3 className="text-lg font-semibold mb-3">Q{index + 1}: {q.question}</h3>
            <div className="flex flex-col gap-3">
              {q.options.map((opt, optIndex) => (
                <label
                  key={optIndex}
                  className={`px-4 py-2 rounded-lg cursor-pointer border flex items-center gap-3
                    ${selected[index] === opt.text
                      ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                      : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={opt.text}
                    checked={selected[index] === opt.text}
                    onChange={() => handleOptionChange(index, opt.text)}
                    disabled={submitted || alreadySubmitted}
                    className="hidden"
                  />
                  <span className="font-semibold">{String.fromCharCode(97 + optIndex)})</span> {opt.text}
                </label>
              ))}
            </div>
            {selected[index] && <p className="text-sm text-green-600 mt-2">You selected: {selected[index]}</p>}
          </div>
        ))}

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={submitted || alreadySubmitted}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-lg transition-all disabled:opacity-50"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteQuiz;
