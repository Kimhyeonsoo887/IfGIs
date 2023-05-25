

const ReviewPosts = ({ reviews }) => {

    return (
        <div style={{width:1000+"px", height:200+"px", borderTop:2+"px solid black", display:"inline-block"}}>
         
         
          {reviews.map(data => (

            <div key={data.id} style={{borderTop : 2+ "px solid #e0e0e0"}}>
              {data.fileName !== null ? 
                <img style={{width:50+"px"}} src={require(`../uploadImg/${data.fileName}`)} alt={data.fileName}/> 
                : 
                <img style={{width:50+"px"}} src={require(`../img/noImage.gif`)}/> 
              }
              <div>
                <h4>{data.title}</h4>
                <p>{data.content}</p>
              </div>
            </div>
          ))}
        </div>
    )
}

export default ReviewPosts;