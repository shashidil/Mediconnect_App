import React from 'react';
import './App.css';
import {ROUTES} from "./routes/Route";
import {RouterProvider} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <RouterProvider router={ROUTES}  />
    </div>
  );
}

export default App;
