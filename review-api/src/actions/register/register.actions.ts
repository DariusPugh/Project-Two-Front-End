import { registerTypes } from "./register.types";

export const registerError = (error: string) => {
  return {
    payload: {
      error
    },
    type: registerTypes.REGISTER_ERROR,
  }
}

export const registerPassword = (regpassword: string) => {
  return {
    payload: {
      regpassword
    },
    type: registerTypes.REGISTER_PASSWORD,
  }
}

export const registerUsername = (regusername: string) => {
  return {
    payload: {
      regusername
    },
    type: registerTypes.REGISTER_USERNAME,
  }
}

export const registerEmail = (email: string) => {
  return {
    payload: {
      email
    },
    type: registerTypes.REGISTER_EMAIL,
  }
}