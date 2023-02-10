import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../redux/actions";
import style from "./Detail.module.css";


  export default function Detail(){
    const dispatch = useDispatch();
    //const idVideogame = useParams();
    let { id } = useParams();
    console.log("id -- >", id);

    //const [vGame, setVGame] = useState({});
    //console.log(detailId)

    useEffect(() => {
        // console.log("entro al useEffect");
        dispatch(getVideogameDetail(id));
      }, [dispatch, id]);

    const vGame = useSelector((state) => state.videogameDetail);
    // console.log("vGame -- >", vGame);
    // console.log("vGame generos-- >", vGame.generos);
    // console.log("vGame platformas-- >", vGame.platformas);
    


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
  }