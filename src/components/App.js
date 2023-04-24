import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import storeProps from "../store";
import Router from "./Router";
import Loading from "Components/Loading/Loading.component";

export default class App extends PureComponent {
  render() {
    const { store, persistor } = storeProps;
    return (
      <Provider store={store}>
        {/* persist gate Makes sure redux state is loaded BEFORE UI! */}
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}
