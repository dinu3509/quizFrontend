import React from 'react'
import {Card,HotCard} from './Cards/Card';
import { quiz,his } from '../assets/image';
const Dashboard = () => {
    const user = localStorage.getItem('user');

  return (
    <div className='relative w-full   px-8 pt-5 text-white z-0'>
        <div className="w-full max-w-screen-2xl mx-auto bg-transparent backdrop-blur-xl rounded-2xl py-5">
            <div className="text-center text-xl">
              <pre className="text-lg">{`👋 Welcome back ${user}!
Get ready to test your skills and challenge your mind.
Good luck on your quiz journey! 🎯`}</pre>

            </div>
            <div className="grid grid-cols-2 gap-10 lg:grid-cols-3  pt-4">
              <Card title='Quiz Me' image={quiz} path='/createquiz' btnMsg='Take Quiz' msg='Test your knowledge on trending AI, tech, and coding topics with engaging and interactive quizzes.'></Card>
              <Card title='History' image={his} btnMsg='Check' msg='View your recent activity, quiz attempts, and progress history across different topics within the app.' path='/history'></Card>
              <HotCard title='Hot Topics' btnMsg='Go' msg=' Discover trending quizzes and popular subjects that everyone’s exploring right now. Stay ahead with the latest buzz!' path='/hottopics'></HotCard>
            </div>
            

        </div>
    </div>
  )
}

export default Dashboard