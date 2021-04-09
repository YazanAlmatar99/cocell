import "./Landing.css";
import { useHistory } from "react-router-dom";
const Landing = () => {
  const history = useHistory();
  const onClick = () => {
    history.push({
      pathname: "/cells",
    });
  };
  return (
    <div className="landing-wrapper">
      <div className="header">
        <img
          alt="cocell logo"
          src="favicon.png"
          width="70px"
          className="rotate linear infinite"
        ></img>
        <h1 className="title is-1">cocell.io</h1>
      </div>

      <h1 className="title is-5">
        - An interactive online React and Javascript IDE to build and test
        front-end code.
      </h1>
      <h1 className="title is-5">
        - Markup editor with real time results preview
      </h1>
      <h1 className="title is-4 ">
        <code>Use Show() method to output data.</code>
      </h1>
      <p className="line-1 anim-typewriter is-5">Build, test and show</p>
      <hr />
      <button
        onClick={onClick}
        className="button is-large is-primary cta-button"
      >
        Start Coding
      </button>
      <div className="instructions-wrapper">
        <h1 className="title is-3">What can you do?</h1>
        <ol>
          <li>
            You can add an infinite number of cells by clicking on the{" "}
            <code>+ Code</code> or <code>+ Text</code> icon
          </li>
          <li>
            Each cell can read the code from all of the previous cells, you can
            define a variable and reference it in the next cells.
          </li>
          <li>
            Click the <code>Format</code> button to use builtin Prettier to
            format your code.
          </li>
          <li>
            Delete cells, move cells up or down by using the navigation arrows
            on the top right.
          </li>
          <li>
            You can import CSS libraries - EX:
            <code>import 'bulma/css/bulma.css'</code>
          </li>
        </ol>
      </div>
      <div className="github">
        <h1 className="title is-6">
          <a href="https://github.com/YazanAlmatar99" target="_blank">
            My GitHub
          </a>
        </h1>
        <h1 className="title is-6">
          <a
            href="https://github.com/YazanAlmatar99/cocell/issues"
            target="_blank"
          >
            Create an Issue on GitHub
          </a>
        </h1>
        <h1 className="title is-6">
          <a href="https://www.yazanalmatar.com" target="_blank">
            https://www.yazanalmatar.com
          </a>
        </h1>
        <h1 className="title is-7">Version 1.0</h1>
      </div>
    </div>
  );
};

export default Landing;
