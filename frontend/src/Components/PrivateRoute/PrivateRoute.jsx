import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = (props) => {
  let Cmp = props.component;

  let history = useHistory();

  if (!localStorage.getItem("userInfo")) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;

// const PrivateRoute = ({ component: Component, children, ...rest }) => {
//   const { log } = useContext(UserContext);
//   const [loggedInUser, setLoggedInUser] = log;
//   console.log(loggedInUser);
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         loggedInUser.email ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { log } = useContext(UserContext);

//   const [loggedInUser, setLoggedInUser] = log;

//   console.log(loggedInUser);

//   <Route
//     {...rest}
//     render={(props) =>
//       loggedInUser.email ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location },
//           }}
//         />
//       )
//     }
//   />;
// };

// export default PrivateRoute;
