import React from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import axios from 'axios';
import styles from '../css/Login.module.css';

export default function FoodInfomation(){

    let { la, ma, address } = useParams();
    const movePage = useNavigate();
    
    function reducer(state, action){

        if(action.name === "paymentMtd" || action.name === "appTime"){
            
            const targetEls = document.getElementsByName(action.name);
            const checkedValues = Array.from(targetEls)
                .filter((el) => el.checked)
                .map((el) => el.value)
                .join(",");
            return {
                ...state,
                [action.name]: checkedValues,
            };
        }else{
            return{
                ...state,
                [action.name]: action.value
            };
        }
        
    }


    //reducer뒤에는 상태 기본값을 씀
    const [state, foodDispatch] = useReducer(reducer, {
        storeName: "",
        storeType: "",
        paymentMtd: "",
        appTime: "",
        category: ""
    });

    const handleAccount = (e) => {
        //데이터를 변화시키기 위한 동작을 할 dispatch
        //action값을 보냄
        foodDispatch(e.target);
    };

    const { storeName, storeType, paymentMtd, appTime, category} = state;


    function insertFoodInformation(){

        if(state.storeName === ""){
            alert("가게이름을 입력하세요");
            return;
        }
        if(state.storeType === ""){
            alert("가게형태를 입력하세요");
            return;
        }
        if(state.paymentMtd === ""){
            alert("결제방식을 입력하세요");
            return;
        }
        if(state.appTime === ""){
            alert("출몰시기를 선택하세요.");
            return;
        }
        if(state.category === ""){
            alert("카테고리를 선택하세요.");
            return;
        }

        axios({
            url: 'http://183.109.96.235:8080/insertFoodInformation', // 통신할 웹문서
            method: 'POST', // 통신할 방식
            data: { storeName: state.storeName,
                    storeType: state.storeType,
                    paymentMtd: state.paymentMtd,
                    appTime: state.appTime,
                    category: state.category,
                    la : la,
                    ma : ma,
                    address: address
                }

          }).then(function (res) {

            if(res.data != 0){
                window.alert("제보가 완료되었습니다.");
                movePage("/");
            }

          }).catch((error => {
            console.log(`error: ${error}`)
          }));

    }



    return (

        <div>
            <label>가게이름:</label>
            <input type="text" name="storeName" placeholder='예)리아네 분식' onChange={handleAccount} /> <br />

            <label>가게형태</label>
            <input type="radio" name="storeType" value={"길거리"} onClick={handleAccount}/>
            <label>길거리</label>
            <input type="radio" name="storeType" value={"매장"} onClick={handleAccount}/>
            <label>매장</label>
            <input type="radio" name="storeType" value={"편의점"} onClick={handleAccount}/>
            <label>편의점</label> <br/>

            
            <label>결제방식</label>
            <input type="checkbox" name="paymentMtd" value={"cash"} onClick={handleAccount}/>
            <label>현금</label>
            <input type="checkbox" name="paymentMtd" value={"card"} onClick={handleAccount}/>
            <label>카드</label>
            <input type="checkbox" name="paymentMtd" value={"cvistore"} onClick={handleAccount}/>
            <label>계좌이체</label><br/>


            <label>출몰시기</label>
            <label>일</label>
            <input type="checkbox" name="appTime" value={"su"} onClick={handleAccount}/>
            <label>월</label>
            <input type="checkbox" name="appTime" value={"mo"} onClick={handleAccount}/>
            <label>화</label>
            <input type="checkbox" name="appTime" value={"tu"} onClick={handleAccount}/>
            <label>수</label>
            <input type="checkbox" name="appTime" value={"we"} onClick={handleAccount}/>
            <label>목</label>
            <input type="checkbox" name="appTime" value={"th"} onClick={handleAccount}/>
            <label>금</label>
            <input type="checkbox" name="appTime" value={"fr"} onClick={handleAccount}/>
            <label>토</label>
            <input type="checkbox" name="appTime" value={"sa"} onClick={handleAccount}/><br/>

            <label>카테고리</label>
            <input type="radio" name="category" value={"1"} onClick={handleAccount}/>
            <label>고기집</label>
            <input type="radio" name="category" value={"2"} onClick={handleAccount}/>
            <label>붕어빵</label>
            <br/>
            <button className={styles.btn} style={{width:183 + "px", height: 40 + "px", marginTop:10+"px"}} onClick={insertFoodInformation}>제보하기</button>

        </div>
    )
}