import { useLoaderData } from "@remix-run/react";

const templates = {
  login() {
    return (
      <h1>Login</h1>
    );
  },
  logout() {
    return (
      <h1>Logout</h1>
    );
  }
}

export async function loader({rquest, params}) {
  console.log(templates.login.toString());
  return {"template": "1"}
}
