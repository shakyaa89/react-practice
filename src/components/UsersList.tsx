import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  email: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg font-medium">
        Loading users...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-10 text-lg font-semibold">
        {error}
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Users List
      </h2>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li
            key={user._id}
            className="py-4 flex sm:flex-row sm:justify-between sm:items-center"
          >
            <span className="text-lg font-medium text-gray-900">
              {user.username}
            </span>
            <span className="text-sm text-gray-600 mt-1 sm:mt-0">
              {user.email}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
