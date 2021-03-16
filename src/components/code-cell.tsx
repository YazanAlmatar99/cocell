import { useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";

const CodeCell = () => {
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

export default CodeCell;
