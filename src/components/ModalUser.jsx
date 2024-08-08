import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect, handleLogin } from "react";
axios;
export default function ModalUser({
  modal,
  setModal,
  handleLogin,
  isLoggedIn,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [action, setAction] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const email = formData.email;
  const validateEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };

  useEffect(() => {}, []);
  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    const typeApi =
      action === "login"
        ? "https://pokemon-api-phi-nine.vercel.app/login"
        : "https://pokemon-api-phi-nine.vercel.app/signup";
    console.log("typeApi", typeApi);
    try {
      const response = await axios.post(typeApi, formData);
      const token = response.data.user.token.value;
      console.log("🚀 ~ handleSubmit ~ token:", token);
      Cookies.set("token", token, { expires: 7 });
      setModal(false);
      handleLogin(token);

      action === "login" ? alert("login success") : alert("SignUp success");
    } catch (error) {
      setError(error.response.data.message);
      console.log("error-modal", error);
    }
  };

  return (
    <div className=" mt-80  md:mr-11 md:static fixed right-1/2 translate-x-1/2 md:translate-x-0 h-56 w-340px bg-white rounded-lg flex flex-col items-center">
      <p className="pt-3 pb-3"> Account</p>
      <form
        onSubmit={(e) => {
          e.preventDefault(), handleSubmit();
        }}
        className="flex flex-col justify-center items-center gap-3 w-330px h-152px bg-primary-light rounded-lg"
      >
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="h-7 w-200px bg-white rounded-4 p-3 "
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="h-7 w-200px bg-white rounded-4 p-3 "
        />
        <div className="flex gap-6px ">
          <button
            type="submit"
            onClick={() => {
              setAction("login");
            }}
            className="h-10 w-150px rounded-lg bg-white text-primary "
          >
            Login
          </button>
          <button
            type="submit"
            onClick={() => {
              setAction("signup");
            }}
            className="h-10 w-150px rounded-lg bg-primary text-white"
          >
            SignUp
          </button>
        </div>
      </form>
      <>
        {error && (
          <div className="w-full flex justify-start items-start ">
            <p className="text-red-500 pl-2 ">{error}</p>
          </div>
        )}
      </>
    </div>
  );
}
