import { useEffect, useState } from "react";
import type { UserType } from "../types/userTypes";
import { createUser, deleteUser, getUsers, updateUser } from "../services/api";
import Loader from "./Loader";
import ErrorRender from "./Error";
import UpdateUserModal from "./UpdateUserModal";

const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newUser, setNewUser] = useState<Omit<UserType, "id">>({
    "name": "",
  "username": "",
  "email": "",
  "address": {
    "street": "",
    "suite": "",
    "city": "",
    "zipcode": "",
    "geo": {
      "lat": "",
      "lng": ""
    }
  },
  "phone": "",
  "website": "",
  "company": {
    "name": "",
    "catchPhrase": "",
    "bs": ""
  }
  });

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const initialState = {
    "name": "",
  "username": "",
  "email": "",
  "address": {
    "street": "",
    "suite": "",
    "city": "",
    "zipcode": "",
    "geo": {
      "lat": "",
      "lng": ""
    }
  },
  "phone": "",
  "website": "",
  "company": {
    "name": "",
    "catchPhrase": "",
    "bs": "" 
  }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        if (!data) {
          throw new Error("Error fetching users");
        }
        setUsers(data || []);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Faile to fetch users",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
      try {
        const createdUser = await createUser(newUser);
        setUsers([...users, createdUser]);
        setNewUser(initialState);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to create user");
      }
  }

  const handleDelte = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));

    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete user");
    }
  }

  const updateUsers = async (id:number, updatedData: Partial<UserType>) => {
    try {
      const  res = await updateUser(id, updatedData);
      setUsers(users.map(usr => usr.id === id ?
        {...usr, ...res} : usr
      ));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update user");
    }
  }

  const openUpdateModal = (user: UserType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  }

  if (loading) return <Loader />;
  if (error) return <ErrorRender error={error} />;

  return (
    <div>
      {/* add new user */}
      <div className="bg-white shadow rounded-g overflow-hidden p-6">
        <h3 className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer text-center">
          Add New User
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <input
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            type="text"
            placeholder="Name"
          />

          <input
          value={newUser.username}
          onChange={(e) => setNewUser({...newUser, username: e.target.value})}
            className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            type="text"
            placeholder="username"
          />

          <input
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="flex justify-start mt-4">
          <button
          onClick={handleCreateUser}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer border border-transparent text-sm font-medium shadow-sm">Add User</button>
        </div>
      </div>
      {/* user list */}
      <div className="bg-white shadow rounded-g overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-medium text-gray-800">Users</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {users.map((usr) => (
            <li key={usr.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-purple-900 truncate">
                    {usr.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{usr.email}</p>
                </div>

                <div className="ml-4 shrink-0 flex space-x-4">
                  {/* delete and edit button */}
                  <button 
                  onClick={() => openUpdateModal(usr)}
                  className="cursor-pointer inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Edit
                  </button>




                  <button
                  onClick={() => handleDelte(usr.id)}
                  className="inline-flex cursor-pointer items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* update modal */}
      {
        selectedUser && (
          <UpdateUserModal
          isOpen = {isModalOpen}
          closeModal = {closeModal}
          user = {selectedUser}
          onUpdateUser = {updateUsers}
          />
        )
      }
    </div>
  );
};

export default UserList;
