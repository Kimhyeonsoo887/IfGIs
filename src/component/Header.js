import mainLogo from "../img/IfGisLogo.png";
import styles from "../css/Header.module.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Menu1 from "./HeaderMenu.js";
import { Link } from "react-router-dom";

export default function Header(){
    return (
        
        <div className={styles.headerDiv}>
            <div className={styles.headerLogoLay}>
                <Link to="/"><img className={styles.mainLogo} src={mainLogo} ></img></Link>
            </div>
           <Menu1></Menu1>
        </div>
    )
}