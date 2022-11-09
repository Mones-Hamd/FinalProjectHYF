import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./result.css";

const results = [
  {
    Name: "Guest1",
    attend: true,
    foodList: "lowCarbs",
    drink: "Orange or Lemon Juice",
  },
  { Name: "Guest2", attend: true, foodList: "seaFood", drink: "all" },
  { Name: "Guest3", attend: false, foodList: "halalFood", drink: "Soda " },
  {
    Name: "Guest4",
    attend: false,
    foodList: "vegetarian",
    drink: "Juice Fresh Vegetables",
  },
  { Name: "Guest5", attend: true, foodList: "all", drink: "Red Wine" },
];

const Result = () => {
  const [show, setShow] = useState(false);

  let guestsNum = 0;

  let allRef = {
    lowCarbs: 0,
    seaFood: 0,
    halalFood: 0,
    vegetarian: 0,
    allFoodRef: 0,
    OrangeLemonJuice: 0,
    soda: 0,
    juiceFreshVegetables: 0,
    redWine: 0,
    allDrinkRef: 0,
  };

  results.map((result) => {
    if (result.attend == true) {
      guestsNum += 1;
    }
    if (result.attend == true && result.foodList === "lowCarbs") {
      allRef.lowCarbs += 1;
    }
    if (result.attend == true && result.foodList === "seaFood") {
      allRef.seaFood += 1;
    }
    if (result.attend == true && result.foodList === "halalFood") {
      allRef.halalFood += 1;
    }
    if (result.attend == true && result.foodList === "vegetarian") {
      allRef.vegetarian += 1;
    }
    if (result.attend == true && result.foodList === "all") {
      allRef.allFoodRef += 1;
    }
    if (result.attend == true && result.drink === "Orange or Lemon Juice") {
      allRef.OrangeLemonJuice += 1;
    }
    if (result.attend == true && result.drink === "all") {
      allRef.allDrinkRef += 1;
    }
    if (result.attend == true && result.drink === "Soda") {
      allRef.soda += 1;
    }
    if (result.attend == true && result.drink === "Juice Fresh Vegetables") {
      allRef.juiceFreshVegetables += 1;
    }
    if (result.attend == true && result.drink === "Red Wine") {
      allRef.redWine += 1;
    }
  });

  return (
    <div className="container">
      <div className="guests-count-box">
        <h4>Total result</h4>

        <p>
          Total guests number is : {guestsNum}/{results.length}
        </p>
        <button className="guestList-btn" onClick={() => setShow(true)}>
          Guests List{" "}
        </button>
        <div>
          {show && (
            <div>
              <hr />
              <h3>Showing list </h3>
              <hr />

              <ul className="list-box">
                {results.map((result) => {
                  if (result.attend == true) {
                    return <li key={result.Name}>{result.Name}</li>;
                  }
                })}
              </ul>
              <button
                className="exit"
                type="button"
                onClick={() => setShow(false)}
              >
                X
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="food-section">
        <h4>Food Reference</h4>
        <p>Low Carbs:{allRef.lowCarbs} </p>
        <p>Black coffee :{allRef.seaFood} </p>
        <p>halalFood :{allRef.halalFood} </p>
        <p>vegetarian :{allRef.vegetarian} </p>
        <p>All:{allRef.allFoodRef} </p>
      </div>

      <div className="drink-section">
        <h4>Drink Reference</h4>
        <p>Orange or lemon juice:{allRef.OrangeLemonJuice} </p>
        <p>Soda:{allRef.soda} </p>
        <p>Juice Fresh Vegetables :{allRef.juiceFreshVegetables} </p>
        <p>Red Wine : {allRef.redWine} </p>
        <p>All:{allRef.allDrinkRef}</p>
      </div>
    </div>
  );
};

export default Result;
