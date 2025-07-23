import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [repass, setRePass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePass(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "" || repass === "") {
      setShowModal(true);
      return;
    }

    if (password !== repass) {
      setShowPassModal(true);
      setPass("");
      setRePass("");
      return;
    }

    const finalData = {
      username: username,
      email: email,
      password: password,
    };

    axios.post("http://localhost:3000/users/register", finalData).then(() => {
      setShowSuccessModal(true);
    });

    console.log(finalData);
    setUsername("");
    setEmail("");
    setPass("");
    setRePass("");
  };

  const closeModal = () => {
    setShowModal(false);
    setShowPassModal(false);
  };

  return (
    <div className="w-100 flex items-center justify-center flex-col gap-10 border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg px-15 py-10 rounded-xl ">
      <h1 className="text-2xl font-bold">Register</h1>
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
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="text-[16px] rounded-xl border border-gray-100 bg-white/80 py-3 px-5 shadow backdrop-blur-lg"
        />
        <input
          type="password"
          name="pass"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="text-[16px] rounded-xl border border-gray-100 bg-white/80 py-3 px-5 shadow backdrop-blur-lg"
        />
        <input
          type="password"
          name="re-pass"
          placeholder="Re-type Password"
          value={repass}
          onChange={handleRePasswordChange}
          className="text-[16px] rounded-xl border border-gray-100 bg-white/80 py-3 px-5 shadow backdrop-blur-lg"
        />
        <p className="m-auto">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800 underline">
            Login Here
          </Link>
        </p>
        <input
          type="submit"
          value="Register"
          className="m-auto cursor-pointer rounded-xl bg-blue-600 px-3 py-3 px-5 text-[16px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500"
        />
      </form>

      {showModal && (
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

      {showPassModal && (
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
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 border border-gray-100 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-green-600">Success</h2>
            <p className="text-center text-sm mt-4">
              User Registered Successfully!
            </p>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl w-full cursor-pointer"
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/login");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
