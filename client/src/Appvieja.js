import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Vgames from './components/Vgames';
import Detail from './components/Detail';


//import style from './App.module.css'

function App() {
  const [vGameS, setVGameS] = useState([]);

  const location = useLocation();

  const navigate = useNavigate();

  function handleClick() {
    navigate("/home");
  }

  function onSearch(name){
    fetch(`http://localhost:3001/videogames?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('data.todosJuntos[0]>>> ', data.todosJuntos[0]);
         if (data.todosJuntos[0].name) {
           //console.log('data>>> ', data);
          // console.log('data id>>> ', data.id);

          setVGameS((oldVGameS) => [...oldVGameS, data.todosJuntos]);
          //console.log("vGameS ---->> ", oldVGameS);
         } else {
            window.alert('No hay videojuegos con ese nombre');
         }
      });
  }

  return (
    <div className="App">
      <div className="container">
        <button className="boton-imagen" onClick={handleClick}></button>
        
        {/* {location.pathname !=="/" && <Nav onSearch={onSearch}/> }  */}
      </div>
      <Routes>
        <Route path='/home' element={<Nav onSearch={onSearch}/>}/>
        {/* <Route path="/home" element=
        {
          <Vgames
            vGameS={vGameS}
            // onClose={onClose}
          />
        }
        /> */}
        <Route path='/detail/:detailId' element={<Detail/>}/>
        
      </Routes> 
    </div>


  );
}

export default App;