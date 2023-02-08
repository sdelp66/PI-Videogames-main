import React from "react";
import SearchBar from "./SearchBar";
//import Random from "../Random/Random";
//import styled from "styled-components";
import style from './Nav.module.css'
import { Link } from "react-router-dom";


export default function Nav(props) {
    return (
        <div className={style.nav}>
            {/* <Link to="/"><button>Logout</button></Link>
            <Link to="/about"><button>Acerca de...</button></Link>
            <Random random={props.random} /> */}
            <SearchBar onSearch={props.onSearch}/>
            {/* <Link to="/favorites">Mis Favoritos</Link>
            <Link to="/home"><button>Home...hogar dulce h</button></Link> */}
        </div>
    )

} 