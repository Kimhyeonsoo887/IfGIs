
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import styles from '../css/Login.module.css';

export default function SignUp(){

    const movePage = useNavigate();
    const [user_id, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");


    function onSubmitSignUp(){

        axios({
            url: 'http://3.36.90.170:8080/signUp', // 통신할 웹문서
            method: 'POST', // 통신할 방식
            data: { // 인자로 보낼 데이터
                user_id: user_id,
                password: password,
                username: username
            }
          }).then(function (res) {

            if(res.data === 1){
                alert("완료");
                movePage("/login");
            }else if(res.data === -1){
                alert("ID가 중복됩니다");
            }
            throw new Error('Network response was not ok.');
          }).catch((error => {
            console.log(`error: ${error}`)
          }));

    }
    return (
        <form style={{width:100+"%", height:700+"px"}}>
        
            <div>
                <label>회원가입</label> <br/>
                <input onChange={(e) => {
                    setUserId(e.target.value);
                }} type="text" placeholder="아이디를 입력해주세요" style={{marginTop:10+"px"}} /><br/>

                <input onChange={(e) => {
                    setPassword(e.target.value);
                }} type="text" placeholder="패스워드를 입력해주세요" style={{marginTop:5+"px"}}/><br/>

                <input onChange={(e) => {
                    setUserName(e.target.value);
                }} type="text" placeholder="이름을 입력해주세요" style={{marginTop:5+"px"}}/><br/>
                <button className={styles.btn} style={{width:183 + "px", height: 40 + "px", marginTop:10+"px"}} onClick={onSubmitSignUp}>가입하기</button>
            </div>
        </form>
    )
}