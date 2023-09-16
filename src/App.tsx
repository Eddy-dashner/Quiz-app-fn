import QuizApp from './pages/quizApp';
import Home from './pages/home';
import './pages/home.css';
import Instructions from './pages/instructionPage';
import './pages/instructionPage.css';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup';
import './pages/login.css'
import CorrectAnswers from './pages/correctanswer';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quizApp' element={<QuizApp />} />
          <Route path='/instructionPage' element={<Instructions />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/correctanswer' element={<CorrectAnswers />} />
        </Routes>
      </Router>
    </>
  )
}

export default App