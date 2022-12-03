import React, {useEffect, useState, useRef} from "react";
import "./DarkMode.css";
import "./main.css";
import useToggle from "./hooks/useToggle";
import { ChangeEventHandler } from "react";

/* NEW (START) */
const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };
  
  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };
  
  const storedTheme = localStorage.getItem("theme");
  
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const defaultLight =
    storedTheme === "dark" || (storedTheme === null && prefersDark);
  
  if (defaultLight) {
    setDark();
  }

  const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
     
    if (e.target.checked) {
      setDark();
    } else {
      setLight();
    }
  };
  

  const DarkMode = () => {
    const [date, setDate] = useState(new Date());
    const [val, setVal] = useState("");
    const [isTextChanged, setIsTextChanged] = useToggle();
    const [buttonText, setButtonText] = useState(false);
    const [count, setCount] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const textRef = useRef(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Handle Submit Ran');
      setDisabled(!disabled);
      setVal(val);
      event.target.removeEventListener;
    }

    const showMessage = () => {
      setButtonText(true);
    }

    const addButton = () => {
      let buttons = [];
      // let count = 4;
      for(let i = 0; i < count; i++){
        buttons.push(<button style={localStorage.getItem("theme") === "dark" ? {marginTop: 5, marginBottom: 2,   backgroundColor: '#f0f8ff', marginLeft: 20, marginRight: 20, color: '#800080'} : {marginTop: 5, marginBottom: 2,   backgroundColor: '#cc0000', marginLeft: 20, marginRight: 20, color: 'white'}} onClick={showMessage}>Button {i + 1}</button>)
      }

      return buttons;
    }

    const validate = () => {
      return val.length
    }
 
    useEffect(() => {
      var timer = setInterval(() => setDate(new Date()), 1000);
      return function cleanup(){
        clearInterval(timer);
      }
    })


    return (
      <div className="toggle-theme-wrapper">
        <div className="split left" style={localStorage.getItem("theme") === "light" ? {left: 0,backgroundColor: '#cecece' } : {left: 0, backgroundColor: "white"}}>
        <label className="toggle-theme" htmlFor="checkbox">
          <input
            style={{marginLeft: 20}}
            type="checkbox"
            id="checkbox"
            // NEW
            onChange={toggleTheme}
            defaultChecked={defaultLight}
            onClick={setIsTextChanged}
          />
           {/* <h1>{isTextChanged ? "LightTheme" : "Dark Theme"}</h1> */}
          <div className="slider round"></div>
        </label>
           <h2 style={localStorage.getItem("theme") === "dark" ? {color: '#800080', fontSize: '14px'} :{color: 'white'}}>Heading 1</h2>
           <p style={localStorage.getItem("theme") === "dark" ? {color: '#800080', fontSize: '14px'} :{color: 'white'}}>Text 1</p>
         <form>
         <div style={{display: 'flex', flexDirection: 'column'}}>  
           <textarea
           ref={textRef}
           value={val}
           onChange={(event) => setVal(event.target.value)}
           style={{marginLeft: 20, marginRight: 20}}
           cols={50}
           rows={35}
           />
           <button type="submit" style={localStorage.getItem("theme") === "dark" ? {marginTop: 5, marginBottom: 2,   backgroundColor: '#f0f8ff', marginLeft: 20, marginRight: 20} : {marginTop: 5, marginBottom: 2,   backgroundColor: '#cc0000', marginLeft: 20, marginRight: 20}} disabled={!validate()}> 
            <p style={localStorage.getItem("theme") === "dark" ? {color: '#800080', fontSize: '14px'} :{color: 'white'}}>Send</p>
           </button>
           </div>  
           </form>
         <div style={{display: 'flex', flexDirection: 'column'}}>
            
           <button type="submit" style={localStorage.getItem("theme") === "dark" ? {marginTop: 5, marginBottom: 2,   backgroundColor: '#f0f8ff', marginLeft: 20, marginRight: 20} : {marginTop: 5, marginBottom: 2,   backgroundColor: '#cc0000', marginLeft: 20, marginRight: 20}} onClick={() => setCount(count => count + 1)}> 
           <p style={localStorage.getItem("theme") === "dark" ? {color: '#800080', fontSize: '14px'} :{color: 'white'}}>Add Button 1</p>
           </button>
           {addButton()}
           </div>  
        </div>
       <div style={localStorage.getItem("theme") === "light" ? {left: 0,backgroundColor: 'white' } : {left: 0, backgroundColor: '#cecece'}} className="split right">
          
         <h2 style={localStorage.getItem("theme") === "dark" ? {color: '#800080', fontSize: '24px'} :{color: '#000000'}}>
         {isTextChanged ? "Dark Theme" : "Light Theme"}
           {/* {localStorage.getItem("theme") === "dark" ? "Dark Theme" : "Light Theme"} */}
            </h2>
           <h3 style={localStorage.getItem("theme") === "dark" ? {color: '#800080', fontSize: '24px'} :{color: '#000000'}}>Year: {date.toLocaleDateString()}</h3>
           <h5 style={localStorage.getItem("theme") === "dark" ? {color: '#800080', fontSize: '24px'} :{color: '#000000'}}>Time: {date.toLocaleTimeString()}</h5>
           <h4 style={localStorage.getItem("theme") === "dark" ? {color: '#800080', fontSize: '24px'} :{color: '#000000'}}>{val}</h4>
        
          <h2 style={localStorage.getItem("theme") === "dark" ? {color: '#800080', fontSize: '24px'} :{color: '#000000'}}> 
          {buttonText && <h1> Button Clicked {count + 1} </h1>}
          </h2>
       </div>
      </div>
    );
  };
  
  export default DarkMode;
