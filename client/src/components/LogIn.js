const LogIn = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  }
  return(
    <form>
      <label htmlFor="username">
        <p>username:</p><input id="username" name="username" type="text" autoComplete="username"/>
      </label>
      <label htmlFor="password">
        <p>password:</p><input id="password" name="password" type="text" autoComplete="password"/>
      </label>
      <button type="submit" onClick={(e)=>onSubmit(e)}>log in</button>
    </form>
  )
}
export default LogIn;