
import { 
    GET_GENEROS,
    GET_VIDEOGAMES,
    GET_VIDEOGAMES_XNAME,
    FILTRO_GENERO, 
    FILTRO_FUENTE, 
    ORDEN_ALFA, 
    ORDEN_RATING, 
    GET_VIDEOGAME_DETALLE,
    CARGANDO,
    SET_PAGE,
    RESET_SELECT,
    GUARDA_FILTRO
} from "./actions";
const initialState = {
    videoGames: [],
    allVideoGames: [],
    videogameDetail: {},
    generos: [],
    cargando: false,
    currentPage: 1,
    selectAlfa: "",
    selectRating: "",
    selectGenero: "",
    selectFuente: ""
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videoGames: payload,
                allVideoGames: payload,
                cargando: false,
                currentPage: 1
            };
        
        case GET_VIDEOGAMES_XNAME:
            return{
            ...state,
            videoGames: payload,
            cargando: false
            };
        
        case GET_GENEROS:
            return {
                ...state,
                generos: payload,
            }
        case FILTRO_GENERO:
            const allVideoGames = state.allVideoGames; // aqui traigo todos (sin filtro)
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
                selectGenero: payload
            };

            case FILTRO_FUENTE:
                const allVideoGamesSource = state.videoGames; //  aqui traigo el filtrado previo... el problema es si elijo 1ro este filtro no acumulo...
                const filterCreates =
                  payload === "db"
                    ? allVideoGamesSource.filter((el) => typeof el.id === "string")
                    : allVideoGamesSource.filter((el) => typeof el.id === "number");

                return {
                  ...state,
                  videoGames:
                    payload === "all" ? allVideoGamesSource : filterCreates,
                    selectFuente: payload
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
                      currentPage: 1,
                      selectAlfa: payload,
                      selectRating: ""
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
                          currentPage: 1,
                          selectRating: payload, 
                          selectAlfa: ""
                        };
            case GET_VIDEOGAME_DETALLE:
                return {
                    ...state,
                    videogameDetail: payload,
                    cargando: false
                    };

            case CARGANDO:
                return{
                    ...state,
                    cargando : true
                }

            case SET_PAGE:
                return{
                    ...state,
                    currentPage: payload
                }

            case RESET_SELECT:
                return{
                    ...state,
                    selectAlfa: "",
                    selectRating: "",
                    selectGenero: "",
                    selectFuente: ""
                }

            case GUARDA_FILTRO:
                return {
                    ...state, 
                }
                      
        

        default:
            return state;
}

   }


export default reducer;
