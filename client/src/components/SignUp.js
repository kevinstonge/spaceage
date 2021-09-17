import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { xhr } from "../lib/xhr.js";
import allActions from "../actions";
import validator from "validator";
const SignUp = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    dispatch({ type: allActions.userActions.signUpStatusReset });
  }, [dispatch]);
  const formChange = (e) => {
    dispatch({ type: allActions.userActions.signUpStatusReset });
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(formState.email)) {
      dispatch({
        type: allActions.userActions.signUpError,
        payload: { class: "error", message: "invalid email" },
      });
      return;
    }
    if (formState.newPassword !== formState.confirmPassword) {
      dispatch({
        type: allActions.userActions.signUpError,
        payload: { class: "error", message: "passwords don't match" },
      });
      return;
    }
    dispatch({ type: allActions.userActions.signUp });
    xhr
      .post("/users/signup", {
        email: formState.email,
        password: formState.newPassword,
      })
      .then((r) => {
        if (r.status === 201) {
          dispatch({
            type: allActions.userActions.signedUp,
            payload: { email: formState.email, token: r.data.token },
          });
        } else {
          dispatch({
            type: allActions.userActions.signUpError,
            payload: { message: r.data.message, class: "error" },
          });
        }
      })
      .catch((e) => {
        if (e.response?.status === 409) {
          dispatch({
            type: allActions.userActions.signUpError,
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
      <label htmlFor="new-password">
        <p>password:</p>
        <input
          id="new-password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          onChange={(e) => formChange(e)}
        />
      </label>
      <label htmlFor="confirm-password">
        <p>confirm password:</p>
        <input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="confirm-password"
          onChange={(e) => formChange(e)}
        />
      </label>
      {user.signInStatus !== "" && (
        <p className={user.signUpStatus.class}>{user.signUpStatus.message}</p>
      )}
      <button type="submit" onClick={(e) => onSubmit(e)}>
        sign up
      </button>
    </form>
  );
};
export default SignUp;
