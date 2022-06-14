export const loader = async (request) => {
  console.log("loading...");
  return {
  };
};

export default function Index() {
  ///store snippet
  type IndexStore = {
    state: any
  }
  const store:IndexStore = {
    counter: 0
  }
  ///view snippet

  const block = {
    remix_doc() {
      return (
        <h1>Remix Doc2</h1>
      );
    }
  }

  const view = (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            {block.remix_doc()}
          </a>
        </li>
      </ul>
    </div>
  );

  return view;
}
