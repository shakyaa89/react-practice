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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`http://localhost:3000/users/${userToDelete}`);
      setUsers(users.filter((user) => user._id !== userToDelete));
    } catch (err) {
      alert("Failed to delete user");
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

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
            <button
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 cursor-pointer"
              onClick={() => {
                setShowDeleteModal(true);
                setUserToDelete(user._id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 border border-gray-100 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-red-600">
              Confirm Delete
            </h2>
            <p className="text-center text-sm mt-4 mb-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex gap-4 w-full">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl w-full cursor-pointer"
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-xl w-full cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
