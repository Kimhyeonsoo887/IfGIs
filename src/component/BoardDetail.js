import {  useParams } from 'react-router-dom';

export default function BoardDetail(){

    let { id } = useParams();




    
    return (
        <div>
            {id}
        </div>
    )
}