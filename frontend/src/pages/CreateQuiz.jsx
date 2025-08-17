import React, { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import axios from 'axios';
import { open, multiple } from '../assets/image';
import { useNavigate, useLocation } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('Multiple Choice');
  const [topic, setTopic] = useState(location.state?.topic || '');
  const [number, setNumber] = useState('');
  const [errors, setErrors] = useState({ topic: '', number: '' });

  const validate = () => {
    const newErrors = { topic: '', number: '' };

    if (topic.trim().length < 3) newErrors.topic = 'Topic must be at least 3 characters.';
    if (Number(number) <= 0) newErrors.number = 'Number must be greater than 0.';

    setErrors(newErrors);
    return !newErrors.topic && !newErrors.number;
  };

  const handleSubmit = async () => {
  if (!validate()) return;

  setLoading(true);

  const data = {
    topic,
    number: Number(number),
    type: selected,
    time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  const token = localStorage.getItem('token');

  try {
    // 1️⃣ POST request with 90s timeout
    const postTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Server is busy. Please try again later.')), 90000)
    );const BASE_URL = import.meta.env.VITE_BASE_URL;

    const res = await Promise.race([
      axios.post(`${BASE_URL}quiz/createquiz`, data, {
        headers: { Authorization: token },
      }),
      postTimeout
    ]);

    console.log('Quiz Created:', res.data);
    localStorage.setItem(`quizToken_${res.data.quiz._id}`, res.data.quizToken);

    if (res.data.message === 'Quiz Created Successfully') {
      const quizId = res.data.quiz._id;
      let generatedQuiz = null;
      const startTime = Date.now();
      const totalTimeout = 60000; // 60s max wait for generated questions

      // 2️⃣ Retry GET requests until questions appear or timeout
      while (Date.now() - startTime < totalTimeout) {
        try {
          const getTimeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Server is busy fetching questions.')), 10000)
          );
          const BASE_URL = import.meta.env.VITE_BASE_URL;
          const genRes = await Promise.race([
            axios.get(`${BASE_URL}writequiz/${quizId}`, {
              headers: { Authorization: localStorage.getItem(`quizToken_${quizId}`) },
            }),
            getTimeout
          ]);

          if (genRes.data.quiz.questions.length > 0) {
            generatedQuiz = genRes.data.quiz;
            break;
          }
        } catch (err) {
          console.warn(err.message);
        }

        // wait 1s before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (generatedQuiz) {
        navigate(`/writequiz/${quizId}`, { state: { topic } });
      } else {
        alert('Failed to generate questions. Please try again.');
      }
    }
  } catch (err) {
    alert(err.message || 'Something went wrong.');
    console.error(err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

  return (
 <div className="min-h-screen flex flex-col items-center bg-gray-900 py-10 gap-10">
  <div className="w-full">
      <Header />

  </div>

  {loading ? (
    <div className="flex justify-center items-center h-96">
      <div className="flex flex-col items-center">
        <Puff height={80} width={80} color="#4f46e5" />
        <h2 className="text-white mt-4 text-lg font-semibold">Loading...</h2>
      </div>
    </div>
  ) : (
    <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-lg">
      <h1 className="text-3xl font-extrabold text-white mb-1 text-center">
        Create Quiz
      </h1>
      <p className="text-gray-300 text-center mb-6">Choose your topic and settings</p>

      {/* Topic Input */}
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="topic" className="text-gray-200 font-semibold">
          Topic
        </label>
        <input
          type="text"
          value={topic}
          name="topic"
          id="topic"
          placeholder="Enter Topic"
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={e => {
            setTopic(e.target.value);
            if (e.target.value.trim().length >= 3)
              setErrors(prev => ({ ...prev, topic: '' }));
          }}
        />
        {errors.topic && <span className="text-red-500 text-sm">{errors.topic}</span>}
      </div>

      {/* Number Input */}
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="num" className="text-gray-200 font-semibold">
          Number of Questions
        </label>
        <input
          type="number"
          value={number}
          name="num"
          id="num"
          placeholder="Enter Number"
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={e => {
            setNumber(e.target.value);
            if (Number(e.target.value) > 0)
              setErrors(prev => ({ ...prev, number: '' }));
          }}
        />
        {errors.number && <span className="text-red-500 text-sm">{errors.number}</span>}
      </div>

      {/* Type Buttons */}
      <div className="flex justify-between gap-4 mb-6">
        <Button
          title="Multiple Choice"
          isSelected={selected === 'Multiple Choice'}
          img={multiple}
          onClick={() => setSelected('Multiple Choice')}
        />
        <Button
          title="Open Ended"
          isSelected={selected === 'Open Ended'}
          img={open}
          onClick={() => setSelected('Open Ended')}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
      >
        Submit
      </button>
    </div>
  )}
</div>

  );
};

export default CreateQuiz;
