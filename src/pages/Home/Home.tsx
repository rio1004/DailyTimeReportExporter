import Head from "../../component/Header/Head";
import "../../App.css";
import Body from "../../component/Body/Body";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const loader = async () => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
    }
  };
  useEffect(() => {
    loader();
  }, []);
  return (
    <>
      <Head />
      <Body />
    </>
  );
}

export default App;
