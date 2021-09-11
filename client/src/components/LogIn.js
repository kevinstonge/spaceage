const LogIn = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form>
      <label htmlFor="email">
        <p>email:</p>
        <input id="email" name="email" type="email" autoComplete="email" />
      </label>
      <label htmlFor="password">
        <p>password:</p>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="password"
        />
      </label>
      <button type="submit" onClick={(e) => onSubmit(e)}>
        log in
      </button>
    </form>
  );
};
export default LogIn;
