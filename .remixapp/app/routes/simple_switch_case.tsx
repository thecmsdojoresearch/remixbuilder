export default () => {
  const number = 9;

  return (
    <div>
      {(() => {switch(true){case  (number % 2 === 0) : return ( <>
        <h1>this can be divided by 2</h1>  
        <h1>congrat!</h1>  
      </>);case  (number % 3 === 0) : return ( <>
        <h1>this can be divided by 3</h1> 
        <div>
          {(() => {switch(true){case  (number === 9): return ( <>
            <p>this is number 9</p> 
          </>);}})()}
        </div>
      </>);case  (number % 5 === 0) : return ( <>
        <h1>this can be divided by 5</h1>  
      </>);default: return ( <>
        <h1>this can not be divided by 2,3 or 5</h1>  
      </>);}})()}
      <ul>
        {(() => { const _ = [];
          for(let i = 0; i < 10; i++) {_.push( <>
            <li>{i}</li>
          </> )} return _; } )()}
      </ul>
      <div>
        {(() => { const _ = [];
          for(let i = 1; i <= 4; i++) {_.push( <>
            <h1>Section {i}</h1>
            <div>
              {(() => { const _ = [];
                for(let j = 1; j <= 4; j++) {_.push( <>
                  <p>{j}</p>
                </> )} return _; } )()}
            </div>
          </> )} return _; } )()}
      </div>
    </div>
  );
}
