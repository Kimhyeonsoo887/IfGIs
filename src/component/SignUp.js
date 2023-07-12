
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';
import styles from '../css/Login.module.css';
import {CONFIG_DATA} from '../config/config.js';

export default function SignUp(){

    const movePage = useNavigate();
    const [user_id, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");

    function onSubmitSignUp(e){

        e.preventDefault();

        if(user_id == ""){
            alert("아이디를 입력하세요.");
            return;
        }

        if(password == ""){
            alert("패스워드를 입력하세요.");
            return;
        }

        if(username == ""){
            alert("이름을 입력하세요.");
            return;
        }

        axios({
            url: CONFIG_DATA.backEnd_url+'/signUp', // 통신할 웹문서
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