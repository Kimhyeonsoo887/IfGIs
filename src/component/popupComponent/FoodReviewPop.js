
import React, { useState, useReducer } from 'react';

import '../../css/Modal.css';
import axios from 'axios';

const FoodReviewPop = (props) => {

    const { open, close, header, id } = props;
    const [imageFile, setImageFile] = useState("/images/notImages.png");
    const [formImageData, setFormImageData] = useState();

    const [reviewData, reviewDataDispatch] = useReducer(reducer,{
        title : "",
        content: ""
    })

    function reducer(state, action){
        return{ 
            ...state,
            [action.name]: action.value
        };
    }

    function handleChange(e){
        reviewDataDispatch(e.target);
    }

    function showImageFile(e){
        const file = e.target.files[0];
        //파일선택창 선택없이 닫을경우 예외처리 로직
        if(file === undefined){
            setImageFile("/images/notImages.png");
            return;
        }
        
        setFormImageData(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => { 
            reader.onload = () => {	
                setImageFile(reader.result || null); // 파일의 컨텐츠
                resolve();
            };
        });

        
        
    }

    function insertReview(){


        if(reviewData.title === ""){
            alert("제목을 입력하세요");
            return;
        }

        if(reviewData.content === ""){
            alert("내용을 입력하세요");
            return;
        }

        
        const formData = new FormData();


        formData.append("title", reviewData.title);
        formData.append("content", reviewData.content);
        formData.append("file", formImageData);
        formData.append("id", id);
        
        axios({
            url: 'http://3.36.90.170:8080/insertFoodReview', // 통신할 웹문서
            method: 'POST', // 통신할 방식
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
          }).then(function (res) {

            if(res.data !== 0){
                alert("등록되었습니다.");
                window.location.reload();
                close();
            }
            

            console.log(res.data);
          }).catch((error => {
            console.log(`error: ${error}`)
          }));
    }



    return (

        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
        <section>
            <header>
                {header}
                <button className="close" onClick={close}>&times;</button>
            </header>
            <main>
                <div>
                    <label>제목</label><input type="text" name="title" onChange={(e) => {handleChange(e)}}></input><br/>
                    <label>내용</label><input type="text" name="content" onChange={(e) => {handleChange(e)}}></input>
                    <input type='file' name="file" accept='image/png, image/jpg, image/jpeg' onChange={e => {showImageFile(e)}}></input>
                    <img width={'200px'} src={imageFile} />
                </div>
            </main>
            <footer>
                <button className="close" onClick={insertReview}>제출</button>
                <button className="close" onClick={close}>닫기</button>
            </footer>
        </section>
        ) : null}
    </div>
    );
};

export default FoodReviewPop;