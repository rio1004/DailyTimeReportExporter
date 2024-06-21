import { useState } from "react";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import Loader from "../../component/Loader/index";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../component/InputField/Input";
const Login = () => {
  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [isErrUser, setIsErrUser] = useState<boolean>(true);
  const [isErrPass, setIsErrPass] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleUserChange = (e) => {
    if (!e.target.value) {
      setIsErrUser(true);
    } else {
      setIsErrUser(false);
    }
    setUser(e.target.value);
  };
  const handlePassChange = (e) => {
    if (!e.target.value) {
      setIsErrPass(true);
    } else {
      setIsErrPass(false);
    }
    setPass(e.target.value);
  };
  const submitLogin = async () => {
    console.log(isErrPass, isErrUser);
    console.log(user);
    if (isErrPass || isErrUser) return;
    setIsLoading(true);
    const res = await login({ username: user.trim(), password: pass });
    if (res.status != 200) {
      setIsLoading(false);
      console.log(res);
      toast.error(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("name", res.data.fullName);
      navigate("/");
    }
  };
  const inputStyle = {
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="container">
      <div className="login-container">
        <ToastContainer />
        <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
          Welcome To Daily Report Exporter
        </h1>
        <Input
          style="black"
          value={user}
          error="Tanga parang hindi developer! lagyan mo laman!"
          placeHolder="Enter your Username"
          type="text"
          handleChange={handleUserChange}
          label="Username"
        />
        <Input
          style="black"
          value={pass}
          error="Tanga parang hindi developer! lagyan mo laman!"
          placeHolder="Enter your Password"
          type="password"
          handleChange={handlePassChange}
          label="Password"
        />
        <div className="form-group" style={inputStyle}>
          <div className="btn">
            <button onClick={submitLogin}>
              {!isLoading ? <p>Login</p> : <Loader bgColor="black" />}
            </button>
            <p
              style={{
                fontSize: "12px",
                marginTop: "12px",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => navigate("/register")}
            >
              Register ka muna SEB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
