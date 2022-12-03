import React from "react";
import ReactDOM from "react-dom";
import useLocalStorage from "use-local-storage";
import Square from "./components/Square";
import DarkMode from "./DarkMode";

// const Button = React.lazy(() => import("./components/Button"));
// import Button from "./components/Button";

// import default style
import "./main.css";

interface Data {
  id: number;
  title: string;
}

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark': 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  return (
    <div className="App-header">
      <DarkMode />
    </div>
    // <div className="App">
    //  <button onClick={switchTheme}>
    //   Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    //  </button>
    //  <Square />
    //   <div className="split left">
    //       <h2>Heading 1</h2>
    //       <p>Text 1</p>
    //   </div>
    //   <div className="split right">
    //       <h2>Heading 1</h2>
    //       <p>Text 1</p>
    //   </div>
    // </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
