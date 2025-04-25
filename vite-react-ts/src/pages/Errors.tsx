import { Link, useRouteError, isRouteErrorResponse } from "react-router";

function Errors() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) { 
      return (
        <>
          <h3>Page Not Found</h3>
          <Link to="/dashboard">Go to Dashboard</Link>
        </>
      );
    }
    return (
      <>
        <h3>Error {error.status}</h3>
        <Link to="/dashboard">Go to Dashboard</Link>
      </>
    )
  }
  return (
    <>
      <h3>Unexpected Error</h3>
      <Link to="/dashboard">Go to Dashboard</Link>
    </>
  );
}

export default Errors;