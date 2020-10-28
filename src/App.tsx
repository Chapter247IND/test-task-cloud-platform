import React, { Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import "./App.css";
import Home from "./Components/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import AppReducer from "./Reducers/index";
import { routerMiddleware } from "react-router-redux";
import { createLogicMiddleware } from "redux-logic";
import logic from "../src/Logic";
import logger from "redux-logger";
const logicMiddleware = createLogicMiddleware(logic);

const history = createBrowserHistory({ basename: "/" });
const middlewares = [logicMiddleware, routerMiddleware(history)];
middlewares.push(logger);

export const store = createStore(AppReducer, applyMiddleware(...middlewares));
// Create browser history
const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Suspense fallback={"Loading..."}>
          <Switch>
            <Route exact path={"/"} render={(props: any) => <Home />} />
          </Switch>
          {/* <AppRoutesComponent /> */}
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
