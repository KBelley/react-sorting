import './App.css';

function ShuffleArray(arr){
  return arr.sort(() => Math.random() - 0.5);
}

function ShuffleButtonClick(e){
  console.log('ShuffleButtonClick');
  console.log(e);
  values = ShuffleArray(values);  
  console.log(values);
}

let values = [1,2,3,4,5,6,7,8,9];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <input type='button' value='Shuffle' /> */}
        <input type='button' onClick={(event) => ShuffleButtonClick(event)} value='Shuffle' />

        {values.map(value => (
          <div key={value}><p>{value}</p></div>
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
