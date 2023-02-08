import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home'
import Detail from './components/Detail';



function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/videogame/:id" element={<Detail />} />
      </Routes> 
    </div>

  );
}

export default App;
