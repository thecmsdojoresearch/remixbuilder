export default () => {
    const comp1 = () => {
        return (
            <h1>comp1</h1>
        )
    }

     const comp2 = () => {
        return (
            <h1>comp2</h1>
        )
    }

    const components = [];

    for (let i = 0; i < 3; i++) { components.push(
      <h1>{i}</h1>
    )}

    return (
      <>
        <p>comps</p>
        {components}
      </>
    )
}
