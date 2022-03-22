import { Navigate } from "react-router-dom";

export default function withPublic(Component) {
  console.log("withPublic");
  return ({ user = null, redirectURL = "/", restricted = false }) => {
    if (user && restricted) {
      return <Navigate to={redirectURL} />;
    }
    return <Component />;
  };
}
