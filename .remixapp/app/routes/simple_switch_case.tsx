export default () => {
  const number = 5;
  return (
    <>
      {(() => {switch(true){ //switch
        case(number > 3): return ( <>
            <h1>number greater than 5</h1>
            <h1>number greater than 5...</h1>
            </>); //endcase
      }})()}
    </>
  );
}
