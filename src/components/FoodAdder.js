import React, { useState } from 'react';
import './styles/FoodAdder.css';

function FoodAdder(props) {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const handleChange = (e) => {
    e.target.name === 'food' ? setFood(e.target.value) : setCalories(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setFood('');
    setCalories('');
    props.handleSubmit(food, calories);
  }
  return (
    <form onSubmit={handleSubmit} className="food-adder">
      <input
        onChange={handleChange}
        name="food"
        value={food}
        type="text"
        autoComplete="off"
        required
        placeholder="Добавьте продукты"
      />
      <input
        onChange={handleChange}
        name="calories"
        value={calories}
        type="number"
        autoComplete="off"
        required
        placeholder="Калории"
      />
      <button className="food-adder__submit"></button>
    </form>
  )
}

export default FoodAdder;
