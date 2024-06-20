import { useState } from "react";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import './login.scss'
const Login = () => {
  const [user, setUser] = useState<string>(" ");
  const [pass, setPass] = useState<string>(" ");
  const [isErrUser, setIsErrUser] = useState<boolean>(false);
  const [isErrPass, setIsErrPass] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  const submitLogin = async () => {
    const res = await login({ username: user.trim(), password: pass });
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("id", res.id);
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
          <button onClick={submitLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
