import React from "react";
import "./Spinner.module.css";

function Spinner() {
    console.log("entro a spinner");
  return (
    <div className="spinner-container">
        <h2 style={{ color: "white" }}>Cargando...</h2>
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
      {/* {/* <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div> */}
    </div> 
  );
}

export default Spinner;