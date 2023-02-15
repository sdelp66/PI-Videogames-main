import React from "react";
import style from "./CrearVG.module.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validar } from "./validar";
//actions/REDUX
import { getVideogames, getGeneros, postVideogames } from "../redux/actions";

const CreateVG = ({ func }) => {
  const dispatch = useDispatch();
 
  // get generos
  const allGenres = useSelector((state) => state.generos);

  
  const allPlatforms = ["PlayStation 5", "Xbox Series S/X", "PlayStation 4", "PC", "PlayStation 3", "Xbox 360", "Xbox One", "Nintendo Switch", "macOS", "Android", "Linux" ] // defino algunas plataformas de donde elegir 
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    fechaLanzamiento: "",
    rating: "",
    background_image:"",
    generos: [],
    plataformas: [],
  });

  useEffect(() => {
    dispatch(getGeneros());
  }, [dispatch]);

  // modificar el input
  const handlerInputvalue = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(
      validar({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };


  const handlerselectvalue = (e) => {
    if (input[e.target.name].includes(e.target.value) === false) {
      setInput({
        ...input,
        [e.target.name]: [...input[e.target.name], e.target.value],
      });
    } else {
      return alert("OPPS! :( no podes repetir!!! ;)");
    }
    setErrors(
      validar({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

 
  const deleteOptionGenres = (e, element) => {
    //e.preventDefault();
    const newGenres = input.generos.filter((el) => el !== element);
    setInput({
      ...input,
      generos: newGenres,
    });
    setErrors(
      validar({
        ...input,
        generos: newGenres,
      })
    );
  };

  const deleteOptionPlatforms = (e, element) => {
    //e.preventDefault();
    const newPlatforms = input.plataformas.filter((el) => el !== element);
    setInput({
      ...input,
      plataformas: newPlatforms,
    });
    setErrors(
      validar({
        ...input,
        plataformas: newPlatforms,
      })
    );
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    //console.log(input);
    dispatch(postVideogames(input));
    setInput({
      name: "",
      description: "",
      fechaLanzamiento: "",
      background_image:"",
      rating: "",
      generos: [],
      plataformas: [],
    });
    func()
    dispatch(getVideogames())
  };

  return (
    <form
      onSubmit={(e) => {
        handlerSubmit(e);
      }}
      className={style.container}
    >
      <div className={style.topContainer}>
        <div className={style.formContainer}>
          <h3>Crear Videogame</h3>
          <div className={style.inputContainer}>
            <label for="name">Nombre: </label>
            <input
              placeholder="nombre del juego"
              onChange={(e) => handlerInputvalue(e)}
              value={input.name}
              type="text"
              name="name"
              id="name"
            />
          </div>
          {errors.name && <p className={style.danger}>{errors.name}</p>}
          <div className={style.inputContainer}>
            <label for="fechaLanzamiento">Fecha Lanzamiento: </label>
            <input
              name="fechaLanzamiento"
              placeholder="AAAA-MM-DD"
              onChange={(e) => handlerInputvalue(e)}
              value={input.fechaLanzamiento}
              type="text"
            />
          </div>
          {errors.fechaLanzamiento && <p className={style.danger}>{errors.fechaLanzamiento}</p>}
          <div className={style.inputContainer}>
            <label for="rating">Rating: </label>
            <input
              name="rating"
              placeholder='4.32'
              onChange={(e) => handlerInputvalue(e)}
              value={input.rating}
              type="number"
            />
          </div>
          {errors.rating && <p className={style.danger}>{errors.rating}</p>}
          <div className={style.inputContainer}>
            <label for="description">Descripción: </label>
            <textarea
              name="description"
              maxLength="100"
              placeholder="Ingresa la descripción del juego"
              onChange={(e) => handlerInputvalue(e)}
              value={input.description}
              type="text"
            />
          </div>
          {errors.description && <p className={style.danger}>{errors.description}</p>}
          <div className={style.inputContainer}>
            <label for="background_image">URL Imagen</label>
            <input
              placeholder="https://img.freepik.com/fotos-premium/retrato-jugador-jugueton-loco-que-disfruta-jugando-videojuegos_194143-416.jpg"
              name="background_image"
              onChange={(e) => handlerInputvalue(e)}
              value={input.background_image}
              type="text"
            />
          </div>
          {errors.background_image && <p className={style.danger}>{errors.background_image}</p>}


          <div className={style.selectsContainer}>
            <div className={style.selectContainer}>
              <label for="generos">Generos</label>
              <select
                onChange={(e) => handlerselectvalue(e)}
                className={style.select}
                name="generos"
                id="generos"
              >
                {allGenres?.map((el) => {
                  return (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
              <div>
                {input.generos?.map((element, i) => {
                  return (
                    <div key={i} className={style.optionSelectContainer}>
                      <p>{element}</p>
                      <button onClick={(e) => deleteOptionGenres(e, element)}>
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {errors.generos && <p className={style.danger}>{errors.generos}</p>}
            <div className={style.selectContainer}>
              <label for="plataformas">Plataformas</label>
              <select
                onChange={(e) => handlerselectvalue(e)}
                className={style.select}
                name="plataformas"
                id="plataformas"
              >
                {allPlatforms?.map((el,i) => {
                  return (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
              <div>
                {input.plataformas?.map((element, i) => {
                  return (
                    <div key={i} className={style.optionSelectContainer}>
                      <p>{element}</p>
                      <button
                        onClick={(e) => deleteOptionPlatforms(e, element)}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {errors.plataformas && <p className={style.danger}>{errors.plataformas}</p>}
          </div>

          <div className={style.btnContainer}>
            {console.log("errors --->> ", errors)}
            <button className={input.name ==="" || Object.entries(errors).length !== 0 ? style.none : style.btnSubmit} type="submit">
              Crear
            </button>
            <NavLink
              className={style.btnCancel}
              onClick={func}
              to="/home"
            >
              Cancelar
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateVG;