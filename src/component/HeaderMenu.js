import {Link} from 'react-router-dom';
import styles from "../css/Header.module.css";


export default function Menu1() {

  function logout(){
    localStorage.clear();
    window.location.reload();
  }


  function localUserIdChk(){
    const local_userId = localStorage.getItem("user_id");

    if(local_userId != null){
      return <button className={styles.menuBtn} onClick={logout}>로그아웃</button>;
    }else{
      return [<Link key={1} to="/login"><button className={styles.menuBtn}>로그인</button></Link>,
              <Link key={2} to="/signup"><button className={styles.menuBtn}>회원가입</button></Link>
            ];
    }
  }
  
  return (
    <div className={styles.menuBar}>
      <Link to="/"><button className={styles.menuBtn}>메인</button></Link>
      {localUserIdChk()}
    </div>
  );
}

