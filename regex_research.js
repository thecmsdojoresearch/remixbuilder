let line = `<input type="button" @click="page.login()" />`;
const regexp = new RegExp('\@click\=\"([A-Za-z0-9.() _]*)\"');
const matches = line.match(regexp);
if (typeof matches === 'object' && matches.length === 2) {
  const fromText = matches[0];
  console.log(fromText);
  const expression = matches[1];
  const toText = `onClick={()=>{${expression}}}`;
  line = line.replace(fromText, toText);
  console.log(line);
}
