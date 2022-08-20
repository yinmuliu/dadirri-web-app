import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <a href="/">Dadirri</a>
      <a href="/">About Dadirri</a>
      <a href="/">What can I record?</a>
      <a href="/">View my recording</a>
      <a href="/">Log out</a>
      {/* <NavLink to="/">About Dadirri</NavLink>
      <NavLink to="/">What can I record?</NavLink>
      <NavLink to="/">View my recording</NavLink> */}
    </nav>
  );
};

export default NavBar;
