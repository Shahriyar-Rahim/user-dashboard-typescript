import type { UserType } from "../types/userTypes";

const API_URL = "https://jsonplaceholder.typicode.com/users";
export const getUsers = async (): Promise<UserType[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }
  const data = await res.json();
  return data;
};

export const createUser = async (user: Omit<UserType, "id">) => {
  const create = await fetch(API_URL, {
    method: "POST",
    headers: {
      contentType: "application/json",
    },
    body: JSON.stringify(user),
  })

  if(!create.ok) {
    throw new Error(`HTTP Error: ${create.status}`)
  }

  return create.json();
}

export const deleteUser = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })

  if(!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`)
  }
}

export const updateUser = async (id: number, user: Partial<UserType>): Promise<UserType> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      contentType: "application/json",
    },
    body: JSON.stringify(user),
  })

  if(!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`)
  }

  return res.json();
}