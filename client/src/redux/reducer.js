
import { 
    GET_GENEROS,
    GET_VIDEOGAMES,
    GET_VIDEOGAMES_XNAME,
    FILTRO_GENERO, 
    FILTRO_FUENTE, 
    ORDEN_ALFA, 
    ORDEN_RATING, 
    GET_VIDEOGAME_DETALLE,
} from "./actions";
const initialState = {
    videoGames: [],
    allVideoGames: [],
    videogameDetail: {},
    generos: [],

};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videoGames: payload,
                allVideoGames: payload,
            };
        
        case GET_VIDEOGAMES_XNAME:
            return{
            ...state,
            videoGames: payload
            };
        
        case GET_GENEROS:
            return {
                ...state,
                generos: payload,
            }
        case FILTRO_GENERO:
            const allVideoGames = state.allVideoGames;
            const filteredVideogames = allVideoGames.filter(game => {
                for (let i = 0; i < game.generos.length; i++) {
                  if (game.generos[i].name === payload) {
                    return true;
                  }
                }
                return false;
              });
            // console.log("allvideogames en el FiltroGenero>>>", allVideoGames )
            // console.log("filteredVideogames en el FiltroGenero >>> ",filteredVideogames );
            return {
                ...state,
                videoGames: filteredVideogames,
            };

            case FILTRO_FUENTE:
                const allVideoGamesSource = state.allVideoGames;
                const filterCreates =
                  payload === "db"
                    ? allVideoGamesSource.filter((el) => typeof el.id === "string")
                    : allVideoGamesSource.filter((el) => typeof el.id === "number");
                    // for (let i = 0; i < allVideoGamesSource.length; i++) {
                    //     console.log(`allVideoGamesSource id del i=${i} >>> `, allVideoGamesSource[i].id);
                    //     console.log(`allVideoGamesSource id del i=${i} type >>> `, typeof allVideoGamesSource[i].id);
                    //   }
                    // console.log("allVideoGamesSource id el 0 length>>> ", allVideoGamesSource[0].id.length);
                    // console.log("allVideoGamesSource dentro filtro source >>> ",allVideoGamesSource);
                    // console.log("filterCreates dentro filtro source >>> ",filterCreates);
                return {
                  ...state,
                  videoGames:
                    payload === "all" ? allVideoGamesSource : filterCreates,
                };
            
                case ORDEN_ALFA:
                    let sortAlfa=
                      payload === "a-z"
                        ? state.videoGames.sort(function (a, b) {
                            if (a.name > b.name) {
                              return 1;
                            }
                            if (b.name > a.name) {
                              return -1;
                            }
                            return 0;
                          })
                        : state.videoGames.sort(function (a, b) {
                            if (a.name > b.name) {
                              return -1;
                            }
                            if (b.name > a.name) {
                              return 1;
                            }
                            return 0;
                          });
                    return {
                      ...state,
                      videoGames: sortAlfa,
                    };

                    case ORDEN_RATING:
                        let sortRating =
                          payload === "0-5"
                            ? state.videoGames.sort(function (a, b) {
                                if (a.rating > b.rating) {
                                  return 1;
                                }
                                if (b.rating > a.rating) {
                                  return -1;
                                }
                                return 0;
                              })
                            : state.videoGames.sort(function (a, b) {
                                if (a.rating > b.rating) {
                                  return -1;
                                }
                                if (b.rating > a.rating) {
                                  return 1;
                                }
                                return 0;
                              });
                        return {
                          ...state,
                          videoGames: sortRating,
                        };
            case GET_VIDEOGAME_DETALLE:
                return {
                    ...state,
                    videogameDetail: payload,
                    };
                      
        

        default:
            return state;
}

   }


export default reducer;
