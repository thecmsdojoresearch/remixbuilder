export default () => {
  const number = 2;
  return (
    <div>
      {(() => {switch(true){
        case(number > 1) : return ( <>
          <h1>number is greater than 1</h1>  
        </>);
        case(number > 3) : return ( <>
          <h1>number is greater than 3</h1>  
        </>);
        case (number > 5) : return ( <>
          <h1>number is greater than 5</h1>  
        </>);
      }})()}
    </div>
  );
}
