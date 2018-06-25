import { IRegister } from '.';
import { registerTypes } from '../actions/register/register.types';

const initialState: IRegister = {
  email: '',
  error: '',
  regpassword: '',
  regusername: '',
}

export const registerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case registerTypes.REGISTER_EMAIL:
      return {
        ...state,
        email : action.payload.email
      }
      
    case registerTypes.REGISTER_ERROR:
      return {
        ...state,
        error : action.payload.error
      }

    case registerTypes.REGISTER_PASSWORD:
      return {
        ...state,
        regpassword : action.payload.regpassword
      }

    case registerTypes.REGISTER_USERNAME:
      return {
        ...state,
        regusername : action.payload.regusername
      }
  }
  return state;
};
