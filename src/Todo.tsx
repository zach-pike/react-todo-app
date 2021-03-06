import React from "react";
import Button from "@material-ui/core/Button"

import "./Todo.css"
interface props {
    onDoneToggle: (arg0: string) => void,
    onRemove: (arg0: string) => void,

    done: boolean, 
    info: string, 
    index: string 
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