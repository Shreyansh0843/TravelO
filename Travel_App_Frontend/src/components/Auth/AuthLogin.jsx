import "./Auth.css";
import { validateNumber, validatePassword } from "../../utils";
import { loginHandler } from "../../services";
import { useAuth, useAlert } from "../../context";

let isNumberValid, isPasswordValid;

export const AuthLogin = () => {
  const { authDispatch, number, password } = useAuth();
  const { setAlert } = useAlert();

  const handleNumberChange = (event) => {
    isNumberValid = validateNumber(event.target.value);
    if (isNumberValid) {
      console.log("Valid Input");
      authDispatch({
        type: "NUMBER",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Number");
    }
  };

  const handlePasswordChange = (event) => {
    isPasswordValid = validatePassword(event.target.value);
    if (isPasswordValid) {
      console.log("Valid Input");
      authDispatch({
        type: "PASSWORD",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Password");
    }
  };

  

  const handleTestCredentialsClick = async () => {
    try {
      const result = await loginHandler(7878787878, "Abcd@1234", setAlert);
      
      if (result && result.accessToken && result.username) {
        authDispatch({
          type: "SET_ACCESS_TOKEN",
          payload: result.accessToken,
        });
        authDispatch({
          type: "SET_USER_NAME",
          payload: result.username,
        });
        authDispatch({
          type: "CLEAR_USER_DATA",
        });
        authDispatch({
          type: "SHOW_AUTH_MODAL",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlert({
        open: true,
        message: "Login failed. Please try again.",
        type: "error"
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNumberValid && isPasswordValid) {
        const result = await loginHandler(number, password, setAlert);
        if (result && result.accessToken && result.username) {
          authDispatch({
            type: "SET_ACCESS_TOKEN",
            payload: result.accessToken,
          });
          authDispatch({
            type: "SET_USER_NAME",
            payload: result.username,
          });
        }
      }
      authDispatch({
        type: "CLEAR_USER_DATA",
      });
      authDispatch({
        type: "SHOW_AUTH_MODAL",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setAlert({
        open: true,
        message: "Login failed. Please try again.",
        type: "error"
      });
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleFormSubmit}>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Mobile Number <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={number}
            type="number"
            className="auth-input"
            maxLength="10"
            placeholder="Enter Mobile Number"
            required
            onChange={handleNumberChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Password <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={password}
            className="auth-input"
            placeholder="Enter Password"
            type="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button className="button btn-primary btn-login cursor">Login</button>
        </div>
      </form>
      <div className="cta">
        <button
          className="button btn-outline-primary cursor-pointer"
          onClick={handleTestCredentialsClick}
        >
          Login with Test Credentials
        </button>
      </div>
    </div>
  );
};
