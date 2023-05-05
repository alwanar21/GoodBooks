import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";
import { auth } from "../../firebase";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

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