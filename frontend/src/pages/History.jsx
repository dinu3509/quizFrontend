import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HisCard } from '../components/Cards/Card'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const History = () => {
  const [res, setRes] = useState([])
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate(`/createquiz`)
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get("http://localhost:8080/history/", {
          headers: {
            Authorization: token
          }
        })
        setRes(res.data.results)
        if (res.data.results.length === 0) {
          setErr("There is no history of attempting quiz.")
        }
      } catch (err) {
        console.error("Error fetching history:", err.message)
      }
    }
    fetchHistory()
  }, [])

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      <div className="max-w-screen-lg mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Quiz History</h2>

        {/* If no history */}
        {err && (
          <div className="text-center bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="mb-3 text-gray-300">{err}</p>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Write Quiz
            </button>
          </div>
        )}

        {/* Show history results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {res.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition duration-200"
            >
              <HisCard
                topic={item.topic}
                score={item.score}
                total={item.total}
                accuracy={item.accuracy.toFixed(2)}
                date={new Date(item.time).toLocaleString()}
                quizId={item.quizId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default History
