import actionTypes from "../actions/apiMetaDataActions.js";
const getAPIList = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.getAPIList().type:
      return { ...state, apiList: action.payload };
    default:
      return state;
  }
};

export default getAPIList;
