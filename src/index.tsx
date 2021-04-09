import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";
import Landing from './components/Landing'
import { BrowserRouter as Router, Route } from "react-router-dom";
// import CodeCell from "./components/code-cell";
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Route exact path="/cells" component={CellList}/>
          <Route exact path="/" component={Landing}/>
        </Router>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
