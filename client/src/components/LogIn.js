const LogIn = () => {
  return(
    <form>
      <label htmlFor="username">
        <p>username:</p><input id="username" name="username" type="text" autoComplete="username"/>
      </label>
      <label htmlFor="password">
        <p>password:</p><input id="password" name="password" type="text" autoComplete="password"/>
      </label>
    </form>
  )
}
export default LogIn;