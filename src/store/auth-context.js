import {createContext, useState} from "react"

export const AuthContext = createContext({
    token: '',
    apiToken:'',
    iaAuthenticated: false,
    isVideoFullScreen: false,
    isRegistrationRequired: true,
    setFullScreen: (isVideoFullScreen)=>{},
    setRegistrationRequired:()=>{},
    authenticate: (token) =>{},
    authenticateApi: (token) =>{},
    logout: () => {}
});

function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState();
    const [apiToken, setApiToken] = useState();
    const [videoFullScreen, setVideoFullScreen] = useState();
    const [registration, setRegistration] = useState();

    function authenticate(token){
        setAuthToken(token);
    }
    function authenticateApi(token){
        setApiToken(token);
    }
    function setFullScreen(token){
        setVideoFullScreen(token);
    }
    function setRegistrationRequired(token){
        setRegistration(token);
    }
    function logout(){
        setAuthToken(null);
    }

    const value = {
        token: authToken,
        apiToken: apiToken,
        isAuthenticated: !!authToken,
        isVideoFullScreen:videoFullScreen,
        isRegistrationRequired: registration,
        authenticate: authenticate,
        authenticateApi:authenticateApi,
        setFullScreen:setFullScreen,
        setRegistrationRequired:setRegistrationRequired,
        logout:logout,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
export default AuthContextProvider
