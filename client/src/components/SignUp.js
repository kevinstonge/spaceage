const SignUp = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form>
      <label htmlFor="email">
        <p>email:</p>
        <input id="email" name="email" type="email" autoComplete="email" />
      </label>
      <label htmlFor="new-password">
        <p>password:</p>
        <input
          id="new-password"
          name="new-password"
          type="password"
          autoComplete="new-password"
        />
      </label>
      <label htmlFor="confirm-password">
        <p>confirm password:</p>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="confirm-password"
        />
      </label>
      <button type="submit" onClick={(e) => onSubmit(e)}>
        sign up
      </button>
    </form>
  );
};
export default SignUp;
