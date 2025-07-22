import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showEmptyFieldsModal, setEmptyFieldsModalValue] = useState(false);
  const [error, setError] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setEmptyFieldsModalValue(true);
      return;
    }

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        loginData
      );

      alert("User Logged in successfully!");

      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const closeModal = () => {
    setEmptyFieldsModalValue(false);
  };

  return (
    <div>
      <div className="w-100 flex items-center justify-center flex-col gap-10 border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg px-15 py-10 rounded-xl ">
        <h1 className="text-2xl font-bold">Login</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className=" text-[16px] rounded-xl border border-gray-100 bg-white/80 py-3 px-5 shadow backdrop-blur-lg"
          />
          <input
            type="password"
            name="pass"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="text-[16px] rounded-xl border border-gray-100 bg-white/80 py-3 px-5 shadow backdrop-blur-lg"
          />
          <p className="m-auto">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-800 underline">
              Register Here
            </Link>
          </p>
          {error && (
            <p className="text-red-600 text-center font-bold">{error}</p>
          )}
          <input
            type="submit"
            value="Login"
            className="m-auto cursor-pointer rounded-xl bg-blue-600 px-3 py-3 px-5 text-[16px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500"
          />
        </form>

        {showEmptyFieldsModal && (
          <div className="fixed inset-0 flex justify-center items-center ">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80 border border-gray-100 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold text-red-500">Error</h2>
              <p className="text-center text-sm mt-4">
                Please fill all the fields to continue.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl w-full cursor-pointer"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* {showPassModal && (
          <div className="fixed inset-0 flex justify-center items-center ">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80 border border-gray-100 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold text-red-500">Error</h2>
              <p className="text-center text-sm mt-4">
                The entered passwords must match.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl w-full cursor-pointer"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LoginForm;
