import React, { useState } from "react";
function TodoList(props) {
  const data = props.data;
  const localData = JSON.parse(localStorage.getItem('todoList'));
  const [check, setCheck] = useState(data.check);
  const [updateFIld, setUpdateFIld] = useState(false);
  const [text, setText] = useState(data.text);
  var reset = props.reset;

  // +++++++++++++update+++++++++++
  const updateTodo = () => {
    // console.log(updateFIld);
    setUpdateFIld(!updateFIld);
  }
  // +++++++++++++++++delete+++++++++++++++
  const deleteTOdo = () => {
    console.log("ccddcdcdsccdscd");
    let filtered = localData.filter(function (value, index, arr) {
      // console.lupdateFIldog(value);
      return value.id !== props.data.id;
    });
    localStorage.setItem("todoList", JSON.stringify(filtered));
    reset();
  }
  // chenge input text
  var handleChange = (e) => {
    setText(e.target.value);
  }
  // updete inputtext
  const upDate = () => {
    let modeWithTime = text.slice(text.length - 8);
    if (!modeWithTime.match(/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/)) {
      alert(`please enter time with this format:"01:20 PM"`);
    } else {
      let index = localData.findIndex((obj => obj.id === props.data.id));
      localData[index].text = text;
      localStorage.setItem("todoList", JSON.stringify(localData));
      setUpdateFIld(!updateFIld);
      reset();
    }

  }
  // task done
  const taskDone = () => {
    let index = localData.findIndex((obj => obj.id === props.data.id));
    localData[index].check = !check;
    localStorage.setItem("todoList", JSON.stringify(localData));
    setCheck(!check);
    reset();
  }
  return (

    <div className="form-check" >


      {
        updateFIld ?
          (<div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Leave For Office 8:00 AM" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} value={text} />
            <button type="button" className="btn btn-primary btn-sm" onClick={upDate}>UPDATE</button>
          </div>) :
          (<div style={{ marginBottom: '12px', border: `1px solid #00000026` }}>
             <input className="form-check-input" type="checkbox" defaultChecked={check} onChange={taskDone} />
            <>
              {
                check ? (<label className="form-check-label" style={{ color: 'gray', textDecoration: 'line-through' }} htmlFor="flexCheck1"><span className="fst-italic pl-1">{data.text}</span></label>) : (<label className="form-check-label" htmlFor="flexCheck1"><span className="fst-italic pl-1">{data.text}</span></label>)
              }
            </>
            <button type="button" className="btn btn-danger  btn-sm" style={{ float: 'right' }} onClick={deleteTOdo}><i className="fa fa-times-circle"></i> </button>
            <button type="button" className="btn btn-primary btn-sm" style={{ float: 'right' }} onClick={updateTodo}> <i className="fa fa-pencil"></i></button>

          </div>)
      }


    </div>
  );
}
export default TodoList;
