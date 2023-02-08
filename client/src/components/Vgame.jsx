import React from "react";
import style from './Vgame.module.css';
import { NavLink } from 'react-router-dom'; // para ir al detalle


export default function Vgame(props) { //en props vienen los atributos de game
   let desarmoGeneros;
   if (typeof props.generos[0] === "string") {
      desarmoGeneros= props.generos.toString();
   } else {
      desarmoGeneros = props.generos.map((e) => e.name).toString();
   }

   return (
      <div className={style.container}>
         <img className={style.imagen} src={props.imagen} alt={props.name} />
         <h3 className={style.title}>{props.name}</h3>
         <div>
            <h4 className={style.info}>
               Generos:
               <span className={style.span}>{desarmoGeneros}</span>
            </h4>
         </div>
         <NavLink to={`/videogame/${props.id}`} className={style.detailLink}>
            Ver detalles
         </NavLink>
      </div>
   );
}