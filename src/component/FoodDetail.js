import { useParams } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import FoodReviewPop from './popupComponent/FoodReviewPop';

export default function FoodDetail(){


    const {id} = useParams();
    const [isPopupBoo, setPopupBoo] = useState(false);

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


    function openPopUp(){
        setPopupBoo(true);
    }

    function closePopUp(){
        setPopupBoo(false);
    }

    return (

        <>
            <div>
                <form style={{width:100+"%", height:400+"px"}}>

                    <div>
                        <label>상세화면</label> <br/>
                        <label>가게이름</label><input type="text" style={{marginTop:10+"px"}} defaultValue={foodDetailData.storeName} disabled/><br/>
                        <label>주소</label><input type="text" style={{marginTop:5+"px", marginLeft:27+"px"}} defaultValue={foodDetailData.address} disabled/><br/>
                        <label>가게형태</label><input type="text"  style={{marginTop:5+"px"}} defaultValue={foodDetailData.storeType} disabled/><br/>
                        <label>결제방식</label><input type="text"  style={{marginTop:5+"px"}} defaultValue={foodDetailData.paymentMtd} disabled/><br/>
                        <label>출몰시기</label><input type="text"  style={{marginTop:5+"px"}} defaultValue={foodDetailData.appTime} disabled/><br/>
                        <label>카테고리</label><input type="text"  style={{marginTop:5+"px"}} defaultValue={foodDetailData.category} disabled/><br/>
                    </div>
                </form>
            </div>



            <div style={{width:100+"%", height:200+"px", border:1+"px solid #e0e0e0"}}>
                <button onClick={openPopUp}>리뷰 등록하기</button>
                등록된 리뷰가 없습니다.
            </div>

            {isPopupBoo ? <FoodReviewPop open={openPopUp} close={closePopUp} header="리뷰 작성"></FoodReviewPop> : ""}
        </>
    )
}