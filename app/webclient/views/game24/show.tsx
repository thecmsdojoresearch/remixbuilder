import { useLoaderData } from "@remix-run/react";
import G24Store from '../../stores/game/g24'; //auto generated

export default () => {
  const data = useLoaderData();
  const store = new G24Store; 
  store._init(); 

  return (
    <div>
      <h1>{data.welcome_essage}</h1>
      <div>
        <div>
          <label>Number 1</label><input type = "text" 
          value = {store.getNumber1()} 
          onChange = {(e) => {store.setNumber1(e.target.value) }}
          />
          <label>Number 2</label><input type = "text" 
          value = {store.getNumber2()}
          onChange = {(e) => {store.setNumber2(e.target.value) }}
            />
          <label>Number 3</label><input type = "text" 
          value = {store.getNumber3()}
          onChange = {(e) => {store.setNumber3(e.target.value) }}
            />
          <label>Number 4</label><input type = "text" 
          value = {store.getNumber4()}
          onChange = {(e) => {store.setNumber4(e.target.value) }}
            />
        </div>
        <div>
          <button onClick = {() => store.showAnswer() }>Show me the answer</button>
        </div>
      </div>
    </div>
  );
}
