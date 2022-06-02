import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../Reducer/authReducer";
import { apiUrl,localTokenName } from "../common/Common";
import SetAuthToken from "../common/setAuthToken";
import { SET_AUTH } from "../common/Actions";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const authInit = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  };
  const [authState, dispatch] = useReducer(authReducer, authInit);

  // authenticated user
  const loadUSer = async ()=>{
    if(localStorage[localTokenName]){
     SetAuthToken(localStorage[localTokenName])
    }
    try {
      const response = await axios.get(`${apiUrl}/Auth`);
    
      if(response.data.succces){
        dispatch({type : SET_AUTH, payload:{isAuthenticated: true,user : response.data.user} })
      }
      return response.data

    } catch (error) {
        console.log(error);
        localStorage.removeItem(localTokenName);
        SetAuthToken(null)
        dispatch({type : SET_AUTH, payload:{isAuthenticated: false,user : null} })
    }
  }

  useEffect(()=>{
    loadUSer()
  }, [])


  // register
  const registerUser = async (userForm) => {
    try {
    const response = await axios.post(`${apiUrl}/Auth/signup`,userForm)
        if(response.data.success){
            localStorage.setItem(localTokenName, response.data.accessToken)
            await loadUSer()
            return response.data
        }
    } catch (error) {
        if(error.response.data) return error.response.data
        else return {success : false, message : error.message }
    }
  };


  // login
  const login = async (userForm) => {
    try {
    const response = await axios.post(`${apiUrl}/Auth/login`,userForm)
        if(response.data.success){
            localStorage.setItem(localTokenName, response.data.accessToken)
            await loadUSer()
            return response.data
        }
    } catch (error) {
        if(error.response.data) return error.response.data
        else return {success : false, message : error.message }
    }
  };
  // logout user 

  const logOutUser = ()=>{
    localStorage.removeItem(localTokenName);
    dispatch({type : SET_AUTH, payload:{isAuthenticated: false,user : null} })
  }

  // authcontext data

  const AuthContextData = { login,registerUser,logOutUser, ...authState }


  return (<AuthContext.Provider value={AuthContextData}>{children}</AuthContext.Provider>)
};


export default AuthContextProvider