import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail, cargando } from "../redux/actions";
import style from "./Detail.module.css";
import Spinner from "./Spinner";



  export default function Detail(){
    const dispatch = useDispatch();

    let { id } = useParams();


    useEffect(() => {
        dispatch(cargando());
        dispatch(getVideogameDetail(id));
      }, [dispatch, id ]);

    const vGame = useSelector((state) => state.videogameDetail);
    const cargueti = useSelector((state) => state.cargando);

    

    if(!cargueti){
      return (
        <div className={style.detail}>
          <NavLink className={style.btn} to="/home">
            Volver
          </NavLink>
          <img
            className={style.detailImg}
            src={vGame.background_image}
            alt=""
          />
            <div className={style.txt}>
                <h2 className={style.title}>{vGame.name}</h2>
                <h4 className={style.info}>
                    Descripción:
                  <span className={style.span}>
                    {vGame.description}
                  </span>
                </h4>
                <h4 className={style.info}>
                  Fecha de Lanzamiento:
                  <span className={style.span}>{vGame.released}</span>
                </h4>
                <h4 className={style.info}>
                  Generos:
                  <span className={style.span}>{vGame.generos}</span>
                </h4>
                <h4 className={style.info}>
                  Platafomas:
                  <span className={style.span}>{vGame.platformas}</span>
                </h4>
                <h4 className={style.info}>
                  Rating:
                  <span className={style.span}>{vGame.rating}</span>
                </h4>
            </div>
        </div>
      )
    } else {
      return(
        <div className={style.detail}>
          <Spinner />
        </div>
      )
    }
  }