import React from "react";

import styles from "../css/ResultTable.module.css"
const BoardPosts = ({ boards }) => {

    return (
      <div style={{width:1000+"px", height:300+"px",marginLeft:450+"px", borderTop:2+"px solid black"}}>
        <table className={styles.resultTable}>
          <colgroup>
            <col width="10%"/>
            {/* <col width={100}/>
            <col width={100}/>
            <col width={100}/>
            <col width={100}/> */}
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
                <td>{data.title}</td>
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