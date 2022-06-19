import { If, ElIf, Else } from 'rc-if-else';
import { For } from 'react-loops';

export default () => {
  const items = {
    n1: 1,
    n2: 2,
    n3: 3,
    n4: 4,
    n5: 5,
    n6: 6,
  };
  return (
    <>
      <ul>
        <For in={items} as={(number, {key}) =>
        <If condition={number % 2 == 1} >
          <li>{number}</li>
        </If>
          } />
      </ul>
    </>
  );
}
