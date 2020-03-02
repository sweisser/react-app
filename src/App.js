import React from "react";
import "./App.css";
import FoodNutrients from "./components/FoodNutrients";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  console.log("myEnv:", process.env);

  return (
    <div className="App">
      <div>
        <FoodNutrients />
      </div>
    </div>
  );
}

export default App;
