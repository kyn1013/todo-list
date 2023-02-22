import {useState} from "react";

export default function Item({item:i}){
    const [item, setItem] = useState(i);

    const toggle = () => {
        fetch(`/api/items/${item.id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...item,
                status: item.status === "done"? "todo" : "done" //상태를 반대로 해주기
            })
        }).then((res)=>{
            if(res.ok){
                setItem({
                    ...item,
                status: item.status === "done"? "todo" : "done"
                })
            }
        })
    }

    const deleteItem = () => {
        if (window.confirm("삭제하시겠습니까?")){
            fetch(`/api/items/${item.id}`,{
                method: "DELETE"
            }).then((res)=>{
                if(res.ok){
                    setItem({id:0})
                }
            })
        }

        if(item.id === 0){
            return null;
        }

    }

    return(
        <tr>
                <td><input type="checkbox" checked={item.status === "done"? true:false} onClick={toggle}/></td>
                <td>{item.task}</td>
                <td>{item.due}</td>
                <td><button onClick={deleteItem}>Delete</button></td>
            </tr>
    );
}