import { If, Elif, Else } from 'rc-if-else';

export default () => {
  const number = 1;
  return (
    <>
      <If condition={number > 3} >
        <h1>Number is greater than 3</h1>
      </If>
      <If condition={number > 4} >
        <h1>Number is greater than 4</h1>
      </If>
      <If condition={number > 10} >
        <h1>Number is greater than 10</h1>
      </If>
    </>
  );
}
