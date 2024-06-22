import { useState } from "react";
import { login, register } from "../../api";
import { useNavigate } from "react-router-dom";
import "./login.scss";
const Register = () => {
  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [isErrUser, setIsErrUser] = useState<boolean>(false);
  const [isErrPass, setIsErrPass] = useState<boolean>(false);
  const [isFname, setIsFname] = useState<boolean>(false);
  const [isLname, setIsLname] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  const handleFnameChange = (e) => {
    setFname(e.target.value);
  };
  const handleLnameChange = (e) => {
    setLname(e.target.value);
  };
  const submitRegister = async () => {
    if (!user) {
      setIsErrUser(true);
      return;
    }
    if (!pass) {
      setIsErrPass(true);
      return;
    }
    if (!lname) {
      setIsFname(true);
      return;
    }
    if (!fname) {
      setIsLname(true);
      return;
    }
    const params = {
      firstName: fname,
      lastName: lname,
      username: user,
      password: pass,
    };
    const res = await register(params);
    if (res) {
      navigate("/login");
    }
  };
  const inputStyle = {
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="container">
      <div className="login-container">
        <h1 style={{ textAlign: "center", marginBottom:"50px"}}>
          Welcome To Daily Report Exporter
        </h1>
        <div className="form-group" style={inputStyle}>
          <p>
            Username <span>*</span>
          </p>
          <div className="input-group">
            <input
              type="text"
              placeholder="Palagay ng username pls"
              value={user}
              onChange={handleUserChange}
            />
          </div>
          {isErrUser ? (
            <p className="err">
              Tanga parang hindi developer! lagyan mo laman!
            </p>
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
            <p className="err">
              Tanga parang hindi developer! lagyan mo laman!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group" style={inputStyle}>
          <p>
            First Name <span>*</span>
          </p>
          <div className="input-group">
            <input
              type="text"
              placeholder="pati First name"
              value={fname}
              onChange={handleFnameChange}
            />
          </div>
          {isErrPass ? (
            <p className="err">
              Tanga parang hindi developer! lagyan mo laman!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group" style={inputStyle}>
          <p>
            Last Name <span>*</span>
          </p>
          <div className="input-group">
            <input
              type="text"
              placeholder="Sabay mo n rin ang Last Name"
              value={lname}
              onChange={handleLnameChange}
            />
          </div>
          {isErrPass ? (
            <p className="err">
              Tanga parang hindi developer! lagyan mo laman!
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group" style={inputStyle}>
          <div className="btn">
            <button onClick={submitRegister}>Register</button>
          </div>
          <p
            style={{ fontSize: "12px", marginTop: "12px", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            back to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
