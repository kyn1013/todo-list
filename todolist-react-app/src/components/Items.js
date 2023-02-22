import { useState, useEffect } from "react";
import Item from "./Item"; 

export default function items( {endpoint=""} ) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_API_URI}/items${endpoint}`).then((res)=>{
            return res.json() 
        })
        .then((json_response) => { 
            setData(json_response);
        });
    });


    return (
    <table>
        <td></td>
        <td>Task</td>
        <td>Due</td>
        <td></td>
        {data.map( 
            (item)=>{ 
                return <Item key={item.id} item={item}/> //함수에서 유일하게 리턴하는 컴포넌트들의 id를 key로
            }
        )}
    </table>
    );
} 