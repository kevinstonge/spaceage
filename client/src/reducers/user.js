import actionTypes from "../actions/userActions.js";
const initialState = {
  email: "",
  loggedIn: false,
  token: null,
  favorites: [],
  signUpStatus: {
    class: "info",
    message: "",
  },
  logInStatus: {
    class: "info",
    message: "",
  },
}
const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.signUp:
      return {
        ...state,
        signUpStatus: {
          class: "info",
          message: "...attempting to create account..."
        }
      };
    case actionTypes.signedUp:
      return {
        ...state,
        signUpStatus: {
          class: "info",
          message: "success!"
        },
        loggedIn: true,
        email: action.payload.email,
        token: action.payload.token,
      }
    case actionTypes.signUpError:
      return {
        ...state,
        signUpStatus: {
          class: "error",
          message: action.payload.message,
        },
        loggedIn: false,
      }
    case actionTypes.signUpStatusReset:
      return {
        ...state,
        signUpStatus: {
          class: "info",
          message: "",
        }
      }
    case actionTypes.logIn:
      return {
        ...state,
        logInStatus: {
          class: "info",
          message: "...attempting to log you in...",
        }
      }
    case actionTypes.loggedIn:
      return {
        ...state,
        loggedInStatus: {
          class: "info",
          message: "success",
        },
        loggedIn: true,
        email: action.payload.email,
        token: action.payload.token,
      }
    case actionTypes.logInError:
      return {
        ...state,
        loggedInStatus: {
          class: "error",
          message: action.payload.message,
        },
        loggedIn: false,
      }
      case actionTypes.logInStatusReset:
        return {
          ...state,
          logInStatus: {
            class: "info",
            message: "",
          }
        }
    case actionTypes.loggedOut:
      return {
        ...state,
        logInStatus: {
          class: "info",
          message: "",
        },
        loggedIn: false,
        email: "",
        favorites: [],
        token: null,
      }
    case actionTypes.addFavorite:
      return {
        ...state,
        favorites: [...state.favorites, action.payload.favorite],
      }
    case actionTypes.removeFavorite:
      return {
        ...state,
        favorites: [...state.favorites.filter(favorite=>favorite!==action.payload.favorite)],
      }
    case actionTypes.getFavorites:
      return {
        ...state,
        favorites: action.payload.favorites,
      }
    default:
      return state;
  }
}
export default user;