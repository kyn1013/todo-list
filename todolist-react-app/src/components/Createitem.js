import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateItem() {

    const [values, setValues] = useState({ //글씨입력받으면 화면에 나오게하기
        task: "", due: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const navigate = useNavigate();
    const ref = useRef(); //포커스를 첫번째 input에 맞춰주는 애

    useEffect(() => {
        ref.current.focus();
    },[]) //배열을 넘겨주면 맨처음에 페이지가 렌더링 될 때만 포커스가 넘어감

    const onSubmit = (event) => {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_BACKEND_API_URI}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                 task: values.task, 
                 due: values.due, 
                 status: "todo" 
                }),
        }).then((res) => {
            if (res.ok) {
                alert("Create new item!");
                navigate("/todo");
            }
        });
    };

    return (<form onSubmit={onSubmit}>
        <div className="input_area">
            <p>Task</p>
            <input type="text" name="task" value={values.task} onChange={handleChange} ref={ref}/>
            <p>Due</p>
            <input type="text" name="due" value={values.due} onChange={handleChange} />
        </div>
        <button>Create</button>
    </form>
    );
} 