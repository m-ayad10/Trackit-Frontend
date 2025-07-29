import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./src/Context Api/UserContext";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;


export const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const {setUser}=useContext(UserContext)
    useEffect(() => {
        const validate = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/verify-token`, { withCredentials: true })
                const { succuss,user} = response.data
                setUser(user.id);   
                setIsAuthenticated(succuss)
            } catch (error) {
                console.error(error)
                setIsAuthenticated(false)
            }
        }
        validate()
    }, [])
    if (isAuthenticated === null) {
        return <p className='text-center mt-5'>Loading</p>
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
