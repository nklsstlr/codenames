import React, { useState, useEffect } from "react";



const Cockpit = () => {
  const [hint, setHint] = useState('');
  let inputHintValue = 'Hint'
  return (
    <div>
    <div><input placeholder={hint} onChange={(event)=>inputHintValue=event.target.value}></input></div>
    <div><button placeholder="Send" onClick={(event) => setHint(inputHintValue)} ></button></div>
    <h1> cockpit--> {hint}</h1>
    </div>      
  );
}


export default Cockpit;
