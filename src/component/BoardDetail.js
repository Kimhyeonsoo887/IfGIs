import {  useParams, useNavigate } from 'react-router-dom';
import { useEffect,  useReducer} from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {CONFIG_DATA} from '../config/config.js';

export default function BoardDetail(){

    const { id } = useParams();
    let navigate = useNavigate();

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
            url: CONFIG_DATA.backEnd_url+'/getBoardDetail', // 통신할 웹문서
            method: 'POST', // 통신할 방식
            data: { // 인자로 보낼 데이터
                id: id,
            }
            }).then(function (res) {

                if(res.status === 200 && res.data !== "404Error"){
                    defaultHandle(res.data);
                }else{
                    alert("오류가 발생했습니다. 관리자에게 문의바랍니다.");
                    navigate(-1);//뒤로가기
                }
            }).catch((error => {
                console.log(`error: ${error}`)
        }));

         
    }

    useEffect(() => {

        getBoardDetail();


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