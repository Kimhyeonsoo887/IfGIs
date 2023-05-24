import styles from "../css/ResultTable.module.css"

const ReviewPosts = ({ reviews }) => {

    return (
        <div style={{width:1000+"px", height:200+"px", borderTop:2+"px solid black", display:"inline-block"}}>
         
          {reviews.map(data => (

            <div>
              <img style={{width:30+"px"}} src={require(`../uploadImg/${data.fileName}`)} alt={data.fileName}/>
              <div>
                <p>{data.title}</p>

                <p>{data.content}</p>
              </div>
            </div>

            // <tr key={data.id}>
            //   <td><img style={{width:30+"px"}} src={require(`../uploadImg/${data.fileName}`)} alt={data.fileName}/></td>
            //   <td>{data.title}</td>
            //   <td>{data.content}</td> 
              
              
            // </tr>
          ))}
        </div>
    )
}

export default ReviewPosts;