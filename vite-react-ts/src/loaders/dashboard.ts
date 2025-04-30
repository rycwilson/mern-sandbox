import { type LoaderFunction, redirect } from "react-router";

const loader: LoaderFunction = async ({ request }) => {
  // must always return something!
  try {
    const response = await fetch('/api/v1/users/current-user');
    const { user } = await response.json();
    return user;
  } catch (error) {
    return redirect('/');
  }
}

export default loader;