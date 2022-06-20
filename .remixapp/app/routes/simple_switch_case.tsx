export default () => {
  const number = 2;
  return (
    <div>
      {(() => {switch(true){
        case(number > 1) : return ( <>
          <h1>number is greater than 1</h1>  
          <h1>congrat!</h1>  
        </>);
        case(number > 3) : return ( <>
          <h1>number is greater than 3</h1>  
        </>);
        case (number > 5) : return ( <>
          <h1>number is greater than 5</h1>  
        </>);
      }})()}
      <ul>
        {(() => { let _ = [];
          for(let i = 0; i < 10; i++) {_.push( <>
            <li>{i}</li>
          </> )} return _; } )()}
      </ul>
      <div>
        {(() => { let _ = [];
          for(let i = 1; i <= 4; i++) {_.push( <>
            <h1>Section {i}</h1>
            <div>
              {(() => { let _ = [];
                for(let j = 1; j <= 4; j++) {_.push( <>
                  <p>{j}</p>
                </> )} return _; } )()}
            </div>
          </> )} return _; } )()}
      </div>
    </div>
  );
}
