import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import BoardPosts from './BoardPosts';
import Pagination from './Pagination';

export default function BoardList(){

    const [boards, setBoards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); //현재페이지
    const postsPerPage = 10; // 한페이지에서 보여줄 게시판 개수

    useEffect(() => {
      
        axios({
            url: 'http://183.109.96.235:8080/getBoardList', // 통신할 웹문서
            method: 'GET' // 통신할 방식
          }).then(function (res) {
            setBoards(res.data);
          }).catch((error => {
            console.log(`error: ${error}`)
          }));
    }, []);

    /* 새로 추가한 부분 */
    const indexOfLast = currentPage * postsPerPage; // 20
    const indexOfFirst = indexOfLast - postsPerPage; // 10
    const currentPosts = (boards) => {
      let currentPosts = 0;
      currentPosts = boards.slice(indexOfFirst, indexOfLast);
      return currentPosts;
    };


    return (

        <div>
          <h2>게시글 목록</h2>
          <BoardPosts boards={currentPosts(boards)} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={boards.length}
            paginate={setCurrentPage}
          ></Pagination>
        </div>
    )
}