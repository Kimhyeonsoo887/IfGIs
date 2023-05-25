import { useParams } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import FoodReviewPop from './popupComponent/FoodReviewPop';
import ReviewPosts from './ReviewPosts';
import styles from '../css/Login.module.css';
import Pagination from './Pagination';

export default function FoodDetail(){


    const {id} = useParams();
    const [isPopupBoo, setPopupBoo] = useState(false);
    const [reviews, setReviews] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); //현재페이지
    const postsPerPage = 5; // 한페이지에서 보여줄 게시판 개수

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
            url: 'http://183.109.96.235:8080/getFoodStoreDetailData',
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

    async function getReviewData(){

        await axios({
            url: 'http://183.109.96.235:8080/getFoodReview',
            method: 'POST', // 통신할 방식
            data: { // 인자로 보낼 데이터
                id: id
            }
          }).then(function (res) {
            setReviews(res.data);
          }).catch((error => {
            console.log(`error: ${error}`)
          }));
    }

 
    useEffect(() => {
        getReviewData();
    },[])

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

    /* 새로 추가한 부분 */
    const indexOfLast = currentPage * postsPerPage; // 5
    const indexOfFirst = indexOfLast - postsPerPage; // 0
    const currentPosts = (reviews) => {
      let currentPosts = 0;
      currentPosts = reviews.slice(indexOfFirst, indexOfLast);
      return currentPosts;
    };

    return (

        <>
            <div>
                <form style={{width:100+"%", height:300+"px"}}>

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


            <div  style={{width:100+"%", height:450+"px", border:1+"px solid #e0e0e0"}} >
                <h1>리뷰</h1>
                <button className={styles.btn} style={{marginLeft:890 + "px"}} onClick={openPopUp}>리뷰 등록하기</button><br/>
                <div className={styles.reviewDiv} style={{width:100+"%", height:300+"px"}}>
                    {reviews.length > 0 ? <ReviewPosts reviews={currentPosts(reviews)}></ReviewPosts> : "등록된 리뷰가 없습니다."}
                </div>
                <br/>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={reviews.length}
                    paginate={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>

            </div>

            {isPopupBoo ? <FoodReviewPop open={openPopUp} close={closePopUp} header="리뷰 작성" id={id}></FoodReviewPop> : ""}
        </>
    )
}