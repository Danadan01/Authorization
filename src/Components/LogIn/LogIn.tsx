import "./logIn.scss";
import { Link } from "react-router-dom";
import useLoginForm from "../../hooks/useLoginForm";
import useGoogleAuthorization from "../../hooks/useGoogleAuthorization";

const LogIn = () => {
  const loginForm = useLoginForm();
  const { logInGoogle, isActive, setIsActive } = useGoogleAuthorization();

  return (
    <div className="login">
      <form onSubmit={loginForm.handleSubmit} className="login-form">
        <label>Enter your E-mail:</label>
        <input
          type="text"
          name="email"
          onChange={loginForm.handleChange}
          value={loginForm.values.email}
        />
        <div className="errorDiv">
          {loginForm.touched.email && loginForm.errors.email}
        </div>
        <label>Enter your password:</label>
        <input
          type="password"
          name="password"
          onChange={loginForm.handleChange}
          value={loginForm.values.password}
        />
        <div className="errorDiv">
          {loginForm.touched.password && loginForm.errors.password}
        </div>
        <button type="submit">Sign in with E-mail</button>
      </form>
      <button
        className="googleLoginButtn"
        onClick={() => {
          logInGoogle();
          setIsActive(true);
        }}
        disabled={isActive}
      >
        Sign in with Google
      </button>
      <Link to="/registration">Don't have a profile yet?</Link>
    </div>
  );
};

export default LogIn;
