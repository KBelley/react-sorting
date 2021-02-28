import { useEffect, useState } from 'react';
import './App.css';
import {getBubbleSortAnimations, getMergeSortAnimations} from './sortingAlgorithms.js'

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// This is the lowest value that should be in the array.
const MIN_VALUE = 1;

// This is the highest value that should be in the array. Dictates the height of the different bars.
const MAX_VALUE = 1000;

let myValues = initArray;

function getRandomInt(min, max) { // Get a random number between specified values
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initArray(){
  let arr = [];

  for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
    arr.push(getRandomInt(MIN_VALUE, MAX_VALUE));
  }

  return arr;
}

function App() {
  let [values, setValues] = useState(myValues);
  // let [values, setValues] = useState([{key:1, value:1},{key:2, value:2},{key:3, value:3},{key:4, value:4},{key:5, value:5},{key:6, value:6},{key:7, value:7},{key:8, value:8},{key:9, value:9}]);

  function handleNewArray() {
    setValues(initArray);
  }

  function handleMergeSort(){
    const animations = getMergeSortAnimations(values);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = (100 / MAX_VALUE) * newHeight + '%';
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  function handleBubbleSort(){
    const animations = getBubbleSortAnimations(values);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      // const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      const color = 'red';

      setTimeout(() => {
        console.log(i);
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type='button' onClick={handleNewArray} value='New Array' />
        <input type='button' onClick={handleMergeSort} value='Merge Sort' />
        <input type='button' onClick={handleBubbleSort} value='Bubble Sort' />

        <div className='bar-wrapper'>
          {values.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: (100 / MAX_VALUE) * value + '%',
                width: 100 / values.length + '%'
              }}></div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;