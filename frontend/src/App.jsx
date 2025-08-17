import React, { useState } from 'react';
import {Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import CreateQuiz from './pages/CreateQuiz';
import History from './pages/History';
import HotTopics from './pages/HotTopics';
import Button from '@mui/material/Button';
import WriteQuiz from './pages/WriteQuiz';
import RefreshHandler from '../RefreshHandler';
import SubmittedQuiz from './pages/SubmittedQuiz';
import Profile from './pages/Profile';
import QuizResult from './pages/QuizResult';
function App() {
  const [isAuth, setIsAuth] = useState(() => {
  return localStorage.getItem('token') ? true : false;
});


  const PrivateRoute = ({element})=>{
    return isAuth? element : <Navigate to="/login"/>
  }

  return (
    <>
  <RefreshHandler setIsAuth={setIsAuth}></RefreshHandler>

<Routes>
<Route path='/' element={<Navigate to="/login"/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/> 
<Route path='/home' element={<PrivateRoute element={<Home/>}/>}/> 
<Route path="/createquiz" element={<PrivateRoute element={<CreateQuiz />} />} />
<Route path="/writequiz/:id" element={<PrivateRoute element={<WriteQuiz />} />} />
<Route path='/quiz-submitted' element={<PrivateRoute element={<SubmittedQuiz />} />}></Route>
<Route path="/history" element={<PrivateRoute element={<History />} />} />
<Route path="/history/:id" element={<PrivateRoute element={<QuizResult />} />} />

<Route path="/hottopics" element={<PrivateRoute element={<HotTopics />} />} />
<Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
  </Routes>      
    </>
  )
}

export default App
