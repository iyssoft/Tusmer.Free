import {createContext, useState} from "react"

export const AuthContext = createContext({
    token: '',
    apiToken:'',
    iaAuthenticated: false,
    authenticate: (token) =>{},
    authenticateApi: (token) =>{},
    logout: () => {}
});

function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState();
    const [apiToken, setApiToken] = useState();

    function authenticate(token){
        setAuthToken(token);
    }
    function authenticateApi(token){
        setApiToken(token);
    }
    function logout(){
        setAuthToken(null);
    }

    const value = {
        token: authToken,
        apiToken: apiToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        authenticateApi:authenticateApi,
        logout:logout,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
export default AuthContextProvider
