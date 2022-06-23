import { useLoaderData } from "@remix-run/react";

export function loader({request, response}) {
  return {a:5, b:2};
}

export default () => {
  const comps = [];

  function $(element){
    comps.push(element);
  }

  const data = useLoaderData();

  if (data.a % 2 === 0) {
    for (let i = 0; i <= 1; i++) {
      $(<h1 key={i}>{i}</h1>)
    }
  } else {
    for (let i = 0; i <= 0; i++) {
      $(<h1 key={i}>{i}</h1>)
    }
  }

  return (
    <>
      {comps}
    </>
  )
}
