import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { xhr } from "../lib/xhr.js";
import allActions from "../actions";
const LogIn = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({ email: "", password: "" });
  useEffect(() => {
    dispatch({ type: allActions.userActions.logInStatusReset });
  }, [dispatch]);
  const formChange = (e) => {
    dispatch({ type: allActions.userActions.logInStatusReset });
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: allActions.userActions.logIn });
    xhr
      .post("/users/login", {
        email: formState.email,
        password: formState.password,
      })
      .then((r) => {
        if (r.status === 200) {
          dispatch({
            type: allActions.userActions.loggedIn,
            payload: { email: formState.email, token: r.data.token },
          });
        } else {
          dispatch({
            type: allActions.userActions.logInError,
            payload: { message: r.data.message, class: "error" },
          });
        }
      })
      .catch((e) => {
        if (e.response?.status) {
          dispatch({
            type: allActions.userActions.logInError,
            payload: { message: e.response.data.message, class: "error" },
          });
        }
      });
  };
  return (
    <form>
      <label htmlFor="email">
        <p>email:</p>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formState.email}
          onChange={(e) => formChange(e)}
        />
      </label>
      <label htmlFor="password">
        <p>password:</p>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formState.password}
          onChange={(e) => formChange(e)}
        />
      </label>
      {user.logInStatus !== "" && (
        <p className={user.logInStatus.class}>{user.logInStatus.message}</p>
      )}
      <button type="submit" onClick={(e) => onSubmit(e)}>
        log in
      </button>
    </form>
  );
};
export default LogIn;
