import { sidebarTypes } from "./sidebar.types";


export const updateInput = (input:string)=> (dispatch:any)=>{
    dispatch({
        payload:{
          input
        },
        type: sidebarTypes.UPDATE_INPUT
      }
    )
    
  }

  export const updateItems = (input:any[])=> (dispatch:any)=>{
    dispatch({
        payload:{
          input
        },
        type: sidebarTypes.UPDATE_INPUT
      }
    )
    
  }

