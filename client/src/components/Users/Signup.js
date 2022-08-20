const Signup = () => {
  return (
    <form>
      <h1>Sign Up</h1>
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
      <div>
        <label htmlFor="confirm">Confirm Password</label>
        <input
          //   value={fields.password}
          //   onChange={handleChange}
          name="confirm"
          type="confirm"
          id="confirm"
        />
      </div>
      <input type="submit" value="Sign Up" />
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </form>
  );
};

export default Signup;
