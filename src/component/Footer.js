import styles from "../css/Footer.module.css";
import instagramIcon from "../img/instagram_logo.png";
import facebookIcon from "../img/facebook_logo.png";
import twitterIcon from "../img/twitter_logo.jpeg";

export default function Footer(){
    return (
        <div className={styles.footerWrap}>
            <img src={instagramIcon} style={{width:30 + "px", height:30 + "px"}}/>
            <img src={facebookIcon} style={{width:30 + "px", height:30 + "px", marginLeft:8 +"px"}}/>
            <img src={twitterIcon} style={{width:30 + "px", height:30 + "px", marginLeft:8 +"px"}}/>
             <div className={styles.info}>
                <p style={{fontSize:15 + "px"}}>info . Support . Marketing</p>
                <p style={{color:"gray", fontSize:14 + "px", lineHeight:0.5}}>@ 2023 LiaHouse</p>
             </div>

        </div>
    )
}