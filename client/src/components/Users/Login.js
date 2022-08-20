const Login = () => {
  const handleChange = () => {};
  return (
    <form>
      <h1>Log In</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          //   value={fields.username}
          //   onChange={handleChange}
          name="username"
          type="text"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          //   value={fields.password}
          //   onChange={handleChange}
          name="password"
          type="password"
          id="password"
        />
      </div>
      <input type="submit" value="Login" />
      <p>
        No account yet? <a href="/signup">Register here</a>
      </p>
    </form>
  );
};

export default Login;
