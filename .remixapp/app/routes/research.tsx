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
  return {"template": "logout"}
}

export default () => {
  const data = useLoaderData();
  return templates[data.template]();
}
