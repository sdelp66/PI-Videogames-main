import React, { useState } from 'react';
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getVideogamesXName } from "../redux/actions";


export default function SearchBar() {
   const [input, setInput] = useState("");
   const dispatch = useDispatch();

   function handleInput(event){
      setInput(event.target.value)

   }

   const handlerSubmit = (e) => {
      e.preventDefault();
      dispatch(getVideogamesXName(input));
      setInput(" ");
    };

   return (
      <div className={style.searchBar}>
         <input type='text' name='search' placeholder='Tipea nombre del Juego'
         className={style.input}
          onChange={(e)=>handleInput(e)} value={input} />
         <button onClick={(e)=>{handlerSubmit(e)}} className={style.btn}>Buscar x Nombre</button>
      </div>
   );
}