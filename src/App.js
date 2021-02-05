import { useEffect, useState } from 'react';
import './App.css';

// const myArray = [
//   0,1,2,3
// ];

// function shuffle(arra1) {
//   var ctr = arra1.length,
//   temp,
//   index;
// while (ctr > 0) {
//   index = Math.floor(Math.random() * ctr);
//   ctr--;
//   temp = arra1[ctr];
//   arra1[ctr] = arra1[index];
//   arra1[index] = temp;
// }
// return arra1;
// }

// function App(props) {
//   const [list, setList] = useState(myArray);

//   function handleShuffle() {
//     setList(shuffle([...list]));
//     console.log("Shuffle", myArray);
//   }

//   return (
//     <div>
//       {list.map((x, index) => (
//         <div key={x}>
//           {x}
//         </div>
//       ))}
//       <button onClick={handleShuffle}>Shuffle</button>
//     </div>
//   );
// }

// export default App;









function ShuffleArray(arra1){
  // return arr.sort(() => Math.random() - 0.5);
  var ctr = arra1.length,
    temp,
    index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}



let myValues = [1,2,3,4,5,6,7,8,9];

function App() {
  let [values, setValues] = useState(myValues);
  // let [values, setValues] = useState([{key:1, value:1},{key:2, value:2},{key:3, value:3},{key:4, value:4},{key:5, value:5},{key:6, value:6},{key:7, value:7},{key:8, value:8},{key:9, value:9}]);

  let bubbleSort = (inputArr) => {
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (inputArr[j] > inputArr[j + 1]) {
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
  
                setTimeout(() => {
                  setValues([...inputArr]);
                }, j * 1000);
            }
        }
    }
    return inputArr;
  };

  function handleShuffle() {
    setValues(ShuffleArray([...values]));

    // setTimeout(() => {
    //   setValues(ShuffleArray([...values]));
    // }, 1000);
    // console.log("Shuffle", myArray);
  }

  function handleBubbleSort(){
    bubbleSort([...values]);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <input type='button' value='Shuffle' /> */}
        {/* <input type='button' onClick={(event) => ShuffleButtonClick(event)} value='Shuffle' /> */}
        {/* <input type='button' onClick={() => {setValues(ShuffleArray(values));console.log(values);}} value='Shuffle' /> */}
        <input type='button' onClick={handleShuffle} value='Shuffle' />
        <input type='button' onClick={handleBubbleSort} value='Bubble Sort' />

        {/* <p>
          {values}
        </p> */}
        {/* {values.map((value, index) => (
          <div key={value}>{value}</div>
        ))} */}
        {values.map((x, index) => (
        <div key={x}>
          {x}
        </div>
      ))}
      </header>
{/* 
      <section className="App-section">
        {values.map(value => (
          <div><p>{value}</p></div>
        ))}
      </section> */}
    </div>
  );
}

export default App;
