import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import styles from '../css/Login.module.css';


export default function Login(){

    const movePage = useNavigate();
    const [user_id, setUserId] = useState("");
    const [password, setPassword] = useState("");

    function onSubmitLogin(event){

        event.preventDefault(); // 기본 동작 중지

        if(user_id == ""){
            alert("아이디를 입력하세요.");
            return;
        }

        if(password == ""){
            alert("패스워드를 입력하세요.");
            return;
        }

        axios({
            url: 'http://localhost:8080/login', // 통신할 웹문서
            method: 'POST', // 통신할 방식
            data: { // 인자로 보낼 데이터
                user_id: user_id,
                password: password
            }
          }).then(function (res) {

            if(res.data == "-1"){
                alert("일치하는 아이디가 없습니다.");   
            }else if(res.data == "-2"){
                alert("패스워드가 일치하지 않습니다.");
            }else{
                localStorage.clear();
                localStorage.setItem('user_id', res.data.user_id);
                localStorage.setItem('token', res.data.token);
                movePage('/');
                window.location.reload();
            }

          }).catch((error => {
            console.log(`error: ${error}`)
          }));
 
    }

    return (
        <>
            <form className={styles.inputForm}>
                <div>
                    <label>가입하신 이메일로 로그인하세요</label> <br/>
                    <input onChange={(e) => {
                        setUserId(e.target.value);
                    }} type="text" placeholder="아이디"/><br/>
                    <input onChange={(e) => {
                        setPassword(e.target.value);
                    }} type="text" placeholder="패스워드" style={{marginTop:5+"px"}}/><br/>


                    <button className={styles.btn} style={{width:183 + "px", height: 40 + "px", marginTop:10+"px"}} onClick={onSubmitLogin}>로그인</button>
                </div>
            </form>
        </>
    )
}