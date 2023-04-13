import {useState, useEffect} from 'react';
import axios from 'axios';

export default function BoardList(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {


        axios({
            url: 'http://183.109.96.235:8080/getBoardList', // 통신할 웹문서
            method: 'GET' // 통신할 방식
          }).then(function (res) {
            setPosts(res.data);
            
          }).catch((error => {
            console.log(`error: ${error}`)
          }));

        // axios.get('/api/posts').then(response => {
        // setPosts(response.data);
        // });
    }, []);


    return (
        <div>
        <h2>게시글 목록</h2>
        <ul>
            
        </ul>
        </div>
    )
}