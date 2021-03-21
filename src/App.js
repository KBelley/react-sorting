import { useState } from 'react';
import './styles/css/App.css';
import sortingAlgorithms from './sortingAlgorithms.js'

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// This is the lowest value that should be in the array.
const MIN_VALUE = 1;

// This is the highest value that should be in the array. Dictates the height of the different bars.
const MAX_VALUE = 1000;

// Initial array of values to eventually be sorted
let myValues = initArray;

function getRandomInt(min, max) { // Get a random number between specified values
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initArray() {
  let arr = [];

  for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
    arr.push(getRandomInt(MIN_VALUE, MAX_VALUE));
  }

  return arr;
}

function App() {
  let [values, setValues] = useState(myValues);
  let [isProcessing, setProcessingState] = useState(false);

  function handleNewArray() {
    setValues(initArray);
  }

  function handleMergeSort() {
    setProcessingState(true);
    const animations = sortingAlgorithms.getMergeSortAnimations(values);

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

          if (i === animations.length - 1) {
            setProcessingState(false);
          }
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = (100 / MAX_VALUE) * newHeight + '%';

          if (i === animations.length - 1) {
            setProcessingState(false);
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  function handleBubbleSort() {
    const animations = sortingAlgorithms.getBubbleSortAnimations(values);
    let cnt = 1;

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];

      let color = i % 2 !== 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      let isNotColorChange = ((cnt) % 3 === 0 && ((cnt)) % 4 !== 2) || (cnt) % 4 === 0;
      let isColorChange = !isNotColorChange;

      if (isColorChange) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        if (cnt % 2 === 0) {
          color = PRIMARY_COLOR
        } else {
          color = SECONDARY_COLOR
        }

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

      if (cnt < 4) {
        cnt++;
      } else {
        cnt = 1;
      }
    }
  }

  function handleHeapSort() {
    const arrayBars = document.getElementsByClassName('array-bar');
    const animations = sortingAlgorithms.getHeapSortAnimations(values);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>
          Sorting Algorithms Visualiser
        </h1>

        <h3>
          Using <a href='https://reactjs.org/' target='_blank' rel='noreferrer'>React</a>
        </h3>
      </header>

      <section className='inputs'>
        <input type='button' onClick={handleNewArray} value='New Array' disabled={isProcessing} />
        <input type='button' onClick={handleMergeSort} value='Merge Sort' disabled={isProcessing} />
        <input type='button' onClick={handleBubbleSort} value='Bubble Sort' disabled={isProcessing} />
        <input type='button' onClick={handleHeapSort} value='Heap Sort' disabled={isProcessing} />
      </section>

      <section className='bars'>
        <div className='bar-wrapper'>
          {values.map((value, idx) => (
            <div
              className='array-bar'
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: (100 / MAX_VALUE) * value + '%',
                width: 100 / values.length + '%'
              }}></div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;