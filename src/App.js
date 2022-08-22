import React, { useEffect, useState } from "react";
import TodoROw from "./TodoList";

function App() {
  var localData = localStorage.getItem('todoList');
  const [todoList, setTodoList] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    showToDO();
  }, [localData]);
// reload function
  function showToDO() {
    setTodoList(JSON.parse(localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : []);
  };
// input text change
  var handleChange = (e) => {
    setData(e.target.value);
  }
  // addBotton click
  var addTODO = (e) => {
    let time = data.slice(data.length - 8).split(" ")[0].split(":");
    let hour = time[0];
    let minutes = time[1];
    let timeMode = data.slice(data.length - 2);
    let modeWithTime = data.slice(data.length - 8);

    if (!modeWithTime.match(/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/)) {
      alert(`please enter time with this format:"01:20 PM"`);
    }
    else {
      let todoList1 = [...todoList, { "id": new Date().getTime(), "text": data, "hr": hour, "minu": minutes, "tMode": timeMode, "check": false }];
      console.log(todoList1);
      localStorage.setItem("todoList", JSON.stringify(todoList1));
      setData("");
    }
  }
  if (todoList) {
    var componat = todoList.map((t, i) => (<TodoROw key={i} reset={showToDO} data={t} />));
  }

  return (
    <div className="container">
      <br></br>
      <h1><span className="badge bg-secondary d-grid gap-2">TODO List App ....</span></h1>
      <div className="container">
        <h6>Add An Item</h6>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Leave For Office 08:00 AM" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} value={data} />

          <button type="button" className="btn btn-primary btn-sm" onClick={addTODO}>Adding</button>
          <button type="button" className="btn btn-danger  btn-sm" onClick={() => { setData(""); }}>CANCEL</button>
        </div>

      </div>

      {/* list of DOTO */}
      <div className="container">
        <h5><span className="badge bg-dark">TODO List</span></h5>
        {componat}
      </div>
    </div>
  );
}

export default App;
