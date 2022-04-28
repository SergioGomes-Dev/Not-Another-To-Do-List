import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { listsAllReducer, listSingleReducer } from "./reducers/listReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userEmailReducer,
  userVerifyReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  listsAll: listsAllReducer,
  listSingle: listSingleReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userEmail: userEmailReducer,
  userVerify: userVerifyReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
