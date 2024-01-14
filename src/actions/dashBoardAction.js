import axios from "axios"
import backendLink from "../constants/dummyApi"

export const dashboardAction = ()=> async (dispatch) =>{
    try {
        const config = {headers: { "Content-Type":"application/json"}}
        const {data: carts} = await axios.get(`${backendLink}/carts`,config);
        const {data: users} = await axios.get(`${backendLink}/users?limit=100`,config);
        dispatch({type:'dashboardSuccess',
    payload:{carts,users}
    })

    }
    catch(error){
        dispatch({type:'dashboardFail',
    payload:error.response.data.message
    })
    }
}