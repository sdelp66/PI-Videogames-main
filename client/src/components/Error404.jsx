import { NavLink } from "react-router-dom";
import style from "./Error404.module.css"

const Error404 = () => {
  return (
    <div className={style.errorContainer}>
      <div className={style.error404}></div>
      <p>que mira bobo?</p>
      <NavLink className={style.btn} to="/home">
        Anda pa allá
      </NavLink>
    </div>
  );
};

export default Error404;