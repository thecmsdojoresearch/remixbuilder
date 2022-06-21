export default class DB
{ 
  private path = "../db";

  public async get(key) {
    console.log(key);
    const keyPath = key.replace(".","/");
    const keyFile = `${process.cwd()}/${this.path}/${keyPath}.json`;
    let result = {};
    result = await fs.promises.readFile(keyFile);
    result = JSON.parse(result.toString());
    return result;
  }

  public async set(key:string, value:object) {
    const valueJSON = JSON.stringify(value);
    const keyPath = key.replace(".","/");
    await fs.promises.writeFile(`${process.cwd()}/${this.path}/${keyPath}.json`, valueJSON);
  }
}
