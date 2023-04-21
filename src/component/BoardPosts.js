import React from "react";

import styles from "../css/ResultTable.module.css"
import { Link } from "react-router-dom";
const BoardPosts = ({ boards }) => {

    return (
      <div style={{width:1000+"px", height:300+"px", borderTop:2+"px solid black", display:"inline-block"}}>
        <table className={styles.resultTable}>
          <colgroup>
            <col width="10%"/>
            <col width="50%"/>
            <col width="10%"/>
            <col width="10%"/>
            <col width="10%"/>
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성시간</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {boards.map(data => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td><Link to={`/boardDetail/${data.id}`}>{data.title}</Link></td>
                <td>{data.upload_id}</td>
                <td>{data.create_date}</td>
                <td>{data.board_cnt}</td>
              </tr>
            ))}
          </tbody>
        
        </table>
      </div>
    );
  };
  export default BoardPosts;