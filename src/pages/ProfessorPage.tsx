import { useEffect, useState } from "react";
import axios from "axios";

interface Professor {
  _id: string;
  name: string;
  department?: string;
  email?: string;
  bio?: string;
}

const ProfessorPage = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/professors")
      .then((res) => {
        setProfessors(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch professors");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this professor?"))
      return;
    try {
      await axios.delete(`http://localhost:3000/professors/${id}`);
      setProfessors(professors.filter((prof) => prof._id !== id));
    } catch {
      setError("Failed to delete professor");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading professors...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Professors
      </h1>
      <ul className="divide-y divide-gray-200">
        {professors.map((prof) => (
          <li key={prof._id} className="py-4">
            <div className="font-semibold text-lg">{prof.name}</div>
            {prof.department && (
              <div className="text-gray-600">Department: {prof.department}</div>
            )}
            {prof.email && (
              <div className="text-gray-600">Email: {prof.email}</div>
            )}
            {prof.bio && (
              <div className="text-gray-500 text-sm mt-1">{prof.bio}</div>
            )}
            <button
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDelete(prof._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessorPage;
