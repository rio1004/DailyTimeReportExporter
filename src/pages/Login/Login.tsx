import { useEffect, useState } from "react";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import Loader from "../../component/Loader/index";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    if (isErrPass || isErrUser) return;
    setIsLoading(true);
    const res = await login({ username: user.trim(), password: pass });
    if (res.status != 200) {
      setIsLoading(false);
      toast.error("🦄 Wow so easy!", {
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
    }
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("id", res.id);
      localStorage.setItem("name", res.data.fullName);
      navigate("/");
    }
  };
  const inputStyle = {
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="login-container">
      <h1 style={{ textAlign: "center" }}>Welcome To Daily Report Exporter</h1>
      <div className="form-group" style={inputStyle}>
        <p>
          Username <span>*</span>
        </p>
        <div className="input-group">
          <input
            type="text"
            placeholder="Palagay ng Pangalan pls :("
            value={user}
            onChange={handleUserChange}
          />
        </div>
        {isErrUser ? (
          <p className="err">Tanga parang hindi developer! lagyan mo laman!</p>
        ) : (
          ""
        )}
      </div>
      <div className="form-group" style={inputStyle}>
        <p>
          Password <span>*</span>
        </p>
        <div className="input-group">
          <input
            type="password"
            placeholder="Syempre Kelangan ng Password"
            value={pass}
            onChange={handlePassChange}
          />
        </div>
        {isErrPass ? (
          <p className="err">Tanga parang hindi developer! lagyan mo laman!</p>
        ) : (
          ""
        )}
      </div>
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
  );
};

export default Login;
