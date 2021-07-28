import React from "react";
import "./Todo.css"
import Button from "@material-ui/core/Button"

interface props {
    onDoneToggle: (arg0: number) => void,
    onRemove: (arg0: number) => void,

    done: boolean, 
    info: string, 
    index: number 
}

export default function(props: props) {
    return (
        <div className="TodoItem" style={{ opacity: (props.done ? "0.5" : "1.0") }}>
            <div style={{ marginRight: "6px" }} >
                {props.info}
            </div>

            {/* push the buttons to the right */}
            <div style={{ marginLeft: "auto" }}></div>

            <Button variant="contained" onClick={() => props.onDoneToggle(props.index)}>
                { props.done ? <div style={{ textDecoration: "line-through" }}>✔️</div> : <>✔️</>}
            </Button>

            {/* divider */}
            <div style={{ width: "5px" }}></div>

            <Button variant="contained" onClick={() => props.onRemove(props.index)}>
                ❌
            </Button>
        </div>
    )
}