import { combineReducers } from "redux";
import AuthReducer from "../redux/auth/AuthReducer.js";
import toastReducer from "./toast/toastAction.js";



//create root reducer
const rootReducer = combineReducers({
    auth: AuthReducer,
    toast: toastReducer,
});



// export default
export default rootReducer;