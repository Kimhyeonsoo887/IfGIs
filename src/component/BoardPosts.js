import React from "react";

const BoardPosts = ({ boards }) => {
    return (
      <>
        <table>
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
      </>
    );
  };
  export default BoardPosts;