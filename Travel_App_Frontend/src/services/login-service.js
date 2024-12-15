import axios from "axios";

export const loginHandler = async (number, password, setAlert) => {
  try {
    // Convert number to string if it's a number type
    const numberStr = number.toString();
    
    const response = await axios.post(
      "http://localhost:3500/api/auth/login",
      {
        number: numberStr,
        password: password,
      }
    );

    // Check if response has the required data
    if (response.data && response.data.accessToken && response.data.username) {
      const { accessToken, username } = response.data;
      console.log("Logged IN");
      console.log({ accessToken, username });
      localStorage.setItem("token", accessToken);
      localStorage.setItem("username", username);
      setAlert({
        open: true,
        message: "Login Successful!",
        type: "success"
      });
      return { accessToken, username };
    } else {
      throw new Error("Invalid response data");
    }
  } catch (err) {
    console.log("Unable to login:", err.response?.data || err.message);
    setAlert({
      open: true,
      message: err.response?.data?.message || "Login failed. Please check your credentials.",
      type: "error"
    });
    return null;
  }
};