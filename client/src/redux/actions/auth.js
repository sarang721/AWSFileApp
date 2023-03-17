import * as api from "../../api/index"

export const signinGoogle = (accessToken, navigate) => async (dispatch)=>{
    try{
        const {data} = await api.signInGoogle(accessToken)

        dispatch({type : "AUTH", data})
        navigate("/profile")
    }catch(err){
        console.log(err)
    }
}



export const signupGoogle = (accessToken, navigate) => async (dispatch)=>{
    try{
        const {data} = await api.signUpGoogle(accessToken)

        dispatch({type : "AUTH", data})
        navigate("/profile")
    }catch(err){
        console.log(err)
    }
}