// Importing necessary packages
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./state";

// Configuring store using authReducer
const store = configureStore({
reducer: {
auth: authReducer,
},
});

// Creating root element to render the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
// Wrapping the app with Redux Provider and StrictMode
<React.StrictMode>
<Provider store={store}>
<App />
</Provider>
</React.StrictMode>
);