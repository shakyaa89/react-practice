import { useState } from "react";
import axios from "axios";
import UsersList from "../components/UsersList";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showAddProfessorForm, setShowAddProfessorForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!name) {
      setError("Name is required");
      return;
    }
    try {
      await axios.post("http://localhost:3000/professors", {
        name,
        department,
        email,
        bio,
      });
      setSuccess("Professor added successfully!");
      setName("");
      setDepartment("");
      setEmail("");
      setBio("");
    } catch (err) {
      setError("Failed to add professor");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-black-700">
        Dashboard
      </h1>
      <p className="text-lg text-center mb-8 text-gray-700">
        Welcome to your dashboard! Here you can see all registered users and add
        professors.
      </p>

      <div className="flex justify-center w-full mb-6">
        <button
          className="cursor-pointer rounded-xl bg-blue-600 px-3 py-3 px-5 text-[16px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500"
          onClick={() => setShowAddProfessorForm(!showAddProfessorForm)}
        >
          {showAddProfessorForm ? "Hide Form" : "Add Professor"}
        </button>
      </div>

      {showAddProfessorForm && (
        <div className="flex justify-center w-full mb-10">
          <div className="w-100 flex items-center justify-center flex-col gap-10 border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg px-15 py-10 rounded-xl max-w-md w-full">
            <h2 className="text-2xl font-bold">Add Professor</h2>
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-[16px] rounded-xl border border-gray-100 bg-white/80 py-3 px-5 shadow backdrop-blur-lg"
                required
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="text-[16px] rounded-xl border border-gray-100 bg-white/80 py-3 px-5 shadow backdrop-blur-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[16px] rounded-xl border border-gray-100 bg-white/80 py-3 px-5 shadow backdrop-blur-lg"
              />
              <textarea
                name="bio"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="text-[16px] rounded-xl border border-gray-100 bg-white/80 py-3 px-5 shadow backdrop-blur-lg"
                rows={3}
              />
              {success && (
                <div className="text-green-600 text-center font-bold">
                  {success}
                </div>
              )}
              {error && (
                <div className="text-red-600 text-center font-bold">
                  {error}
                </div>
              )}
              <input
                type="submit"
                value="Add Professor"
                className="m-auto cursor-pointer rounded-xl bg-blue-600 px-3 py-3 px-5 text-[16px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
