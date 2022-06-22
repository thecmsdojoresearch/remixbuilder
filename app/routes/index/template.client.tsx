let comp;

if (state.isLoggedIn) {
  comp = (
    <p>Logged in</p>
      <div style={{background: "lightYellow", border: "1px silver solid"}}>
        <page.components.left_nav store={store} />
      </div>
      <button @click="page.logout()">Log Out</button>
  );
} else {
  comp = (
    <div id="form-login">
      <div>
        <label>Your Username...</label>
        <input type="text" @bind="username" />
      </div>
      <div>
        <label>Your Password...</label>
        <input type="password" @bind="password"/>
      </div>
      <button @click="page.login()">
        Login
      </button>
    </div>
  ); 
}

const template = comp;
