import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

    

const Protect = ({ children, requiredRole }) => {
    const navigateTo = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const token = Cookies.get("Token");
    

    useEffect(() => {
        const checkAuth = async () => {
            try {
               
                if (!token) {
                    navigateTo('/');
                    return;
                }

                const response = await axios.get("https://localhost:7129/api/Auth/checkAccess", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const userRole = decodedToken.Role;
                    console.log("User ko role", userRole)

                    if (requiredRole.includes(userRole) ) {
                        setAuthenticated(true);
                    } else {
                        navigateTo('/'); //login in ma fyaldiney or unauthoruzed vaney euta page banayera tyo page ma fyaldniey
                    }
                } else {
                    navigateTo('/');
                }
            } catch (error) {
                console.error("Internal server error:", error);
                navigateTo('/');
            }
        };

        checkAuth();
    }, [navigateTo, token, requiredRole]);

    return authenticated ? <>{children}</> :  null;
};





const RedirectIfAuthenticated = ({children})=>{

    const navigateTo = useNavigate();
    const token = Cookies.get("Token")

    useEffect(()=>{
        if(token){
            navigateTo('/home')

        //Logout gar exist garna ko lagi vanera msg dekhauna toastify use garda vayo
        }


    },[navigateTo, token]);

    return !token ? <>{children}</>: null;





};

export {Protect,RedirectIfAuthenticated};
