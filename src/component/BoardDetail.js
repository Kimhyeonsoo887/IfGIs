import {  useParams } from 'react-router-dom';
import { useEffect, useState, useReducer} from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function BoardDetail(){

    const { id } = useParams();

    //reducer뒤에는 상태 기본값을 씀
    const [boardDetails, boardDispatch] = useReducer(reducer, {
        title: "",
        content: "",
        board_cnt: "",
        upload_id: "",
        create_date: ""
    });


    async function getBoardDetail(){

        await axios({
            url: 'http://183.109.96.235:8080/getBoardDetail', // 통신할 웹문서
            method: 'POST', // 통신할 방식
            data: { // 인자로 보낼 데이터
                id: id,
            }
            }).then(function (res) {
                if(res.status == 200){
                    defaultHandle(res.data);
                }
            }).catch((error => {
                console.log(`error: ${error}`)
        }));

         
    }

    useEffect(() => {

        getBoardDetail();

        // if(boardDetails.title === ""){
        //     getBoardDetail();
        // }
        

    },[]);

    
    function defaultHandle(data){
        boardDispatch(data);
    }

    function reducer(state, action){

        return{
            ...state,
            title : action.title,
            content : action.content,
            board_cnt: action.board_cnt,
            upload_id: action.upload_id,
            create_date: action.create_date

        };
        
    }

    const handleAccount = (e) => {
        console.log(e.target);
    } 
    
    return (
        <div style={{width:1000+"px", display:"inline-block"}}>
            <Row>
                <Form.Label column lg={2}>제목</Form.Label>
                <Col>
                    <Form.Control type="text" placeholder="Normal text" value={boardDetails.title} disabled/>
                </Col>
            </Row>
            <Row>
                <Form.Label column lg={2}>내용</Form.Label>
                <Col>
                    <Form.Control as="textarea" aria-label="With textarea" value={boardDetails.content} disabled/>
                </Col>
            </Row>
            <Row>
                <Form.Label column lg={2}>조회수</Form.Label>
                <Col>
                    <Form.Control type="text" placeholder="Normal text" value={boardDetails.board_cnt} disabled/>
                </Col>
            </Row>
            <Row>
                <Form.Label column lg={2}>글쓴이</Form.Label>
                <Col>
                    <Form.Control type="text" placeholder="Normal text" value={boardDetails.upload_id} disabled/>
                </Col>
            </Row>

            <Row>
                <Form.Label column lg={2}>작성일자</Form.Label>
                <Col>
                    <Form.Control type="text" placeholder="Normal text" value={boardDetails.create_date} disabled/>
                </Col>
            </Row>

        </div>

    
    )
}