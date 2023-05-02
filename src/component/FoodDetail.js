import { useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

export default function FoodDetail(){


    const {id} = useParams();

    const [foodDetailData, foodDetailDispatch] = useReducer(reducer,{
        storeName : "",
        address : "",
        storeType : "",
        paymentMtd : "",
        appTime : "",
        category : ""
    })

    function reducer(state, action){

        return{
            ...state,
            ["storeName"]: action.storeName,
            ["address"]: action.address,
            ["storeType"]: action.storeType,
            ["paymentMtd"]: action.paymentMtd,
            ["appTime"]: action.appTime,
            ["category"]: action.category
        };
    }

    async function getFoodDetailData(){
        await axios({
            url: 'http://183.109.96.235:8080/getFoodStoreDetailData', // 통신할 웹문서
            method: 'POST', // 통신할 방식
            data: { // 인자로 보낼 데이터
                id: id
            }
          }).then(function (res) {
            foodDetailDispatch(res.data);
          }).catch((error => {
            console.log(`error: ${error}`)
          }));
    }

    useEffect(() => {

        if(foodDetailData.storeName === ""){
            getFoodDetailData();
        }

       

        

    },[foodDetailData])




    return (

        <form style={{width:100+"%", height:700+"px"}}>

            <div>
                <label>상세화면</label> <br/>
                <label>가게이름</label><input type="text" style={{marginTop:10+"px"}} defaultValue={foodDetailData.storeName} /><br/>
                <label>주소</label><input type="text" style={{marginTop:5+"px"}} defaultValue={foodDetailData.address} /><br/>
                <label>가게형태</label><input type="text"  style={{marginTop:5+"px"}} defaultValue={foodDetailData.storeType}/><br/>
                <label>결제방식</label><input type="text"  style={{marginTop:5+"px"}} defaultValue={foodDetailData.paymentMtd}/><br/>
                <label>출몰시기</label><input type="text"  style={{marginTop:5+"px"}} defaultValue={foodDetailData.appTime}/><br/>
                <label>카테고리</label><input type="text"  style={{marginTop:5+"px"}} defaultValue={foodDetailData.category}/><br/>
            </div>
        </form>
    )
}