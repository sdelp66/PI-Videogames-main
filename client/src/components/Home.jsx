import React from "react";
import style from "./Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtroXGenero, getGeneros, getVideogames, getVideogamesXName, filtrarFuente, ordenAlfa, ordenRating } from "../redux/actions";
import Vgames from "./Vgames";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();

    const allGeneros = useSelector((state) => state.generos); // para filtar x genero
    const [order, setOrder] = useState(""); // para manejar el orden ALFA
    const [order2, setOrder2] = useState(""); // para manejar el orden rating

     //generos
    const handlerFilterGenre = (e) => {
       // console.log("etargetvalue de genero >>>",e.target.value );
    if (e.target.value) dispatch(filtroXGenero(e.target.value));
    };

    //fuente
    const handlerFilterSource = (e) => {
        // console.log(e.target.value);
        if (e.target.value) dispatch(filtrarFuente(e.target.value));
    };

    //ordenamientos
    const handlerOrderByAlfabetic = (e) => {
        e.preventDefault();
        if (e.target.value) dispatch(ordenAlfa(e.target.value));
        setOrder(e.target.value);
    };

    const handlerOrderByRating = (e) => {
        e.preventDefault();
        if (e.target.value) dispatch(ordenRating(e.target.value));
        setOrder2(e.target.value);
      };

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getVideogamesXName());
        dispatch(getGeneros());
        dispatch(filtroXGenero());
        dispatch(filtrarFuente());
        dispatch(ordenAlfa());
        dispatch(ordenRating());
      }, [dispatch]);

    return (
            
            <div className={style.container}>
                <div className={style.topContainer}>
                    <h1 className={style.title}>Los videogames de Henry</h1>
                    {/* //orden */}
                    <div className={style.selectContainer}>
                        <label for="order">Alfabético x Nombre</label>
                        <select
                            onChange={(e) => handlerOrderByAlfabetic(e)}
                            className={style.select}
                            name="order"
                            id="order"
                        >
                            <option></option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                        </select>
                    </div>
                    <div className={style.selectContainer}>
                        <label for="order">Rating</label>
                        <select
                            onChange={(e) => handlerOrderByRating(e)}
                            className={style.select}
                            name="order"
                            id="order"
                        >
                            <option></option>
                            <option value="0-5">0-5</option>
                            <option value="5-0">5-0</option>
                        </select>
                    </div>
                {/* // filtro generos */}
                <div className={style.selectContainer}>
                    <label for="genero">Generos</label>
                    <select
                        onChange={(e) => handlerFilterGenre(e)}
                        className={style.select}
                        name="genero"
                        id="genero"
                    >
                        <option></option>
                        {allGeneros?.map((el) => {
                        return (
                            <option key={el.id} value={el.name}>
                            {el.name}
                            </option>
                        );
                        })}
                    </select>
                </div>
                {/* // filtro fuente */}
                <div className={style.selectContainer}>
                    <label for="fuente">Fuente</label>
                    <select
                        onChange={(e) => handlerFilterSource(e)}
                        className={style.select}
                        name="fuente"
                        id="fuente"
                    >
                        <option></option>
                        <option value="all">All</option>
                        <option value="api">API</option>
                        <option value="db">DB</option>
                    </select>
                </div>
                <SearchBar /> 
                <Vgames />
            </div>
            Home
        </div>
    )
}
