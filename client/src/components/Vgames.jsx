import React from "react";
import { useSelector } from "react-redux";
import Vgame from './Vgame.jsx';
import Pagination from "./Pagination.jsx";
import style from './Vgames.module.css';

export default function Vgames() {
   
   const allVideoGames = useSelector((state) => state.videoGames); // esto renderizo
   const [currentPage, setCurrentPage] = React.useState(1);
   const gamesPerPage = 15;
   
   const indexOfLastGame = currentPage * gamesPerPage;
   const indexOfFirstGame = indexOfLastGame - gamesPerPage;
   const currentGames = allVideoGames.slice(indexOfFirstGame, indexOfLastGame);

   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

   return (
            
      <div className={style.container}>
         <div className={style.videogames}>
            {
               currentGames.map((e) => {
                  //console.log("e--->", e);
                  let imagenU;
                  if(e.imagen===undefined) {
                     imagenU= e.background_image;
                  } else {
                     imagenU = e.imagen
                  }
               return <Vgame
                  id={e.id}
                  key={e.id}
                  name={e.name}
                  generos={e.generos}
                  imagen={imagenU}
                  />
               })
            }
         </div>
            <Pagination
               totalGames={allVideoGames.length}
               gamesPerPage={gamesPerPage}
               currentPage={currentPage}
               handlePageChange={handlePageChange}
            />
      </div>
   )
}