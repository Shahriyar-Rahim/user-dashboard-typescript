import React, { useState } from "react";
import type { UpdateUserModelProps, UserType } from "../types/userTypes"

const UpdateUserModal = ({isOpen, closeModal, user, onUpdateUser}: UpdateUserModelProps) => {
    const [formData, setFormData] = useState<Partial<UserType>>({
        name: user.name,
        username: user.username,
        email: user.email
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onUpdateUser(user.id, formData);
        closeModal();
    }

    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-2 rounded shadow-lg">
            <div className="flex justify-between items-center p-2">
                <h2 className="text-2xl font-bold">Update User</h2>
                <button className="anchor hover:text-red-500 animate-spin text-2xl font-bold cursor-alias" onClick={closeModal}>X</button>
            </div>
            <div className="p-2">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-around animate-pulse">
                        <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                        type="submit"
                        >
                        Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateUserModal