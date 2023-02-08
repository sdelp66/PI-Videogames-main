import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
    return (
      <div className={style.Container}>
        <div className={style.textContainer}>
          <div className={style.landingTitle}>
            <p>¡Bienvenido!¿Estas listo?</p>
            <p></p>
          </div>
          <NavLink to="/home" className={style.start}>
            GO HOME
          </NavLink>
        </div>
      </div>
    );
  };
  
  export default Landing;