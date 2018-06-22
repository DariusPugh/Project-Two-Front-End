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

  export const updateItems = (items:any[])=> (dispatch:any)=>{
    dispatch({
        payload:{
          items
        },
        type: sidebarTypes.UPDATE_ITEMS
      }
    )
    
  }

  export const updateSelectedItem = (selectedItem:any)=> (dispatch:any)=>{
    dispatch({
        payload:{
          selectedItem
        },
        type: sidebarTypes.UPDATE_SELECTED_ITEM
      }
    )
    
  }

