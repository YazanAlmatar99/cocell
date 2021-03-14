import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import bundle from "./bundler";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const onClick = async () => {
    const output = await bundle(input);
    //to reset the iframe every time before execution
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="console.log('Hello World')"
        onChange={(value) => setInput(value)}
      />
      <textarea
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
