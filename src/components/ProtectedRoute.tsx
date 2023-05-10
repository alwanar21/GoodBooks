import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    // console.log("mencoba", savedUser);

    if (savedUser) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" />
    }

};

export default ProtectedRoute;