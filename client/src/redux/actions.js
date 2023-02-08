import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_XNAME = "GET_VIDEOGAMES_XNAME";
export const GET_GENEROS = "GET_GENEROS";
export const FILTRO_GENERO = "FILTRO_GENERO";
export const FILTRO_FUENTE = "FILTRO_FUENTE";
export const ORDEN_ALFA = "ORDEN_ALFA";
export const ORDEN_RATING = "ORDEN_RATING";
export const GET_VIDEOGAME_DETALLE = "GET_VIDEOGAME_DETALLE"

export const getVideogames = () => {
    return async function (dispatch) {
      try {
        let respuesta = await axios.get(
          `http://localhost:3001/videogames`
        );
        return dispatch({
          type: GET_VIDEOGAMES,
          payload: respuesta.data.todosJuntos,
        });
      } catch (err) {}
    };
};

export const getVideogamesXName = (search) => {
    return async function (dispatch) {
      try {
        let respuesta = await axios.get(
          `http://localhost:3001/videogames?name=${search}`
        );
        return dispatch({
          type: GET_VIDEOGAMES_XNAME,
          payload: respuesta.data.todosJuntos,
        });
      } catch (err) {}
    };
  };

  export const getVideogameDetail = (id) => {
    return async (dispatch) => {
      try {
        const respuesta = await axios.get(
          `http://localhost:3001/videogame/${id}`
        );
        console.log("ejecuto la action");
        return dispatch({ type: GET_VIDEOGAME_DETALLE, payload: respuesta.data });
      } catch (err) {console.log("err->>>", err);}
    };
  };


export const getGeneros = () => {
    return async function (dispatch) {
        try {
            let respuesta = await axios.get(
                `http://localhost:3001/genres`
            );
            return dispatch({
                type: GET_GENEROS,
                payload: respuesta.data,
            });
        } catch (err) {}
    };
};

export const filtroXGenero = (payload) => {
    return {
      type: FILTRO_GENERO,
      payload,
    };
  };

export const filtrarFuente = (payload) => {
    return {
      type: FILTRO_FUENTE,
      payload,
    };
 };

 export const ordenAlfa = (payload) => {
    return {
      type: ORDEN_ALFA,
      payload,
    };
  };

  export const ordenRating = (payload) => {
    return {
      type: ORDEN_RATING,
      payload,
    };
  };