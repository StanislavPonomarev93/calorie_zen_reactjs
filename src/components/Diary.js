import React, { useState } from 'react';
import FoodAdder from './FoodAdder';
import './styles/Diary.css';

function Diary(props) {
  const [foodList, setFoodList] = useState([]);
  const [calorieTotal, setCalorieTotal] = useState(0);
  const handleSubmit = (food, calories) => {
    let calorieTotal = 0;
    let newList = foodList.slice();
    newList.push({ food, calories });
    newList.forEach((entry) => {
      calorieTotal = calorieTotal + parseInt(entry.calories);
    });
    setFoodList(newList);
    setCalorieTotal(calorieTotal);
  }
  return (
    <div className="diary">
      <div className="calories">
        <h2>Цель на день: {props.calGoal}</h2>
        <h2>Калории: {calorieTotal}</h2>
        <ul className="calories__list">
          {foodList.map((food, i) => {
            return (
              <li key={i} >{food.food} - {food.calories}</li>
            )
          })}
        </ul>
      </div>
      <FoodAdder handleSubmit={handleSubmit} />
    </div>
  )
}

export default Diary;
