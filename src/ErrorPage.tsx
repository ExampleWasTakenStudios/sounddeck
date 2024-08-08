import { useRouteError } from "react-router-dom"

export const ErrorPage = () => {
  const error = useRouteError();
  console.error('Route Error:', error);

  return (
    <div>{JSON.stringify(error)}</div>
  )
}
