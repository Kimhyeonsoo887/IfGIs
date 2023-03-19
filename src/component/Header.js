import mainLogo from "../img/IfGisLogo.png";
import styles from "./Header.module.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Menu1 from "./HeaderMenu.js";

export default function Header(){
    return (
        
        <div className={styles.headerDiv}>
            <div className={styles.headerLogoLay}><img className={styles.mainLogo} src={mainLogo}></img></div>
            <Menu1></Menu1>
        </div>
    )
}