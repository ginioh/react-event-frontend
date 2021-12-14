import * as React from "react";
import { Navigate, Route } from "react-router-dom";
import { Layout } from "../Layout";
import { AuthContext } from "../../context/Auth/authContext";

function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
  }

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { logged } = React.useContext(AuthContext)
    return (
        <Route
            {...rest}
            element={props => {
                if (logged === true) {
                    return (
                        <Layout {...props}>
                            <Component {...props} />
                            {/* <ModalLoader loading={Boolean(isFetching)} /> */}
                        </Layout>
                    );
                }
            }}
        />
    );
};

export default PrivateRoute;