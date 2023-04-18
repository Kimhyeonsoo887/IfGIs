import React from "react";
import styled from "styled-components";

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;



const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div >
        <nav>
            <PageLi className="page-item">
              <PageSpan onClick={() => currentPage === 1 ? null : paginate(currentPage - 1)}>
                &lt;
              </PageSpan>
            </PageLi>
            {pageNumbers.map((number) => (
              <PageLi key={number} className="page-item">
                <PageSpan onClick={() => paginate(number)} className="page-link">
                  {number}
                </PageSpan>
              </PageLi>
            ))}

            <PageLi className="page-item">
              <PageSpan onClick={() => currentPage === pageNumbers.length ? null : paginate(currentPage + 1)}>
                &gt;
              </PageSpan>
            </PageLi>
        </nav>
      </div>
    );
  };
  
  export default Pagination;