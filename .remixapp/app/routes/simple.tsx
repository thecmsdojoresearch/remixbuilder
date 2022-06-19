import { If, ElIf, Else } from 'rc-if-else';
import { For } from 'react-loops';

export default () => {
  const numbers = [
    1,2,3,4,5,20,376,23,39
  ];
  return (
    <>
      <ul>
        <For of={numbers} as={(number) =>
          <If condition={number % 2 == 1} >
            <li>{number}</li>
          </If>
        } />
      </ul>
    </>
  );
}
