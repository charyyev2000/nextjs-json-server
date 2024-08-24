import { NextResponse } from "next/server";
import { ITasks } from "./types/tasks";
import { error } from "console";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITasks[]> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    cache: "no-store",
  });
  const todos = await res.json();
  return todos;
};

export const addTodo = async (todo: ITasks): Promise<ITasks> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

// export const editTodo = async (todo: ITasks): Promise<ITasks> => {
//   const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(todo),
//   });
//   const updatedTodo = await res.json();
//   return updatedTodo;
// };

export const editTodo = async (todo: ITasks): Promise<ITasks> => {
  try {
    // Perform the HTTP PUT request
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    // Check if the fetch request was successful
    if (!res.ok) {
      throw new Error(`Failed to update todo with ID`);
    }

    // Parse the JSON response
    const updatedTodo = await res.json();
    return updatedTodo;
  } catch (error) {
    // Handle errors that occur during the fetch operation
    console.error("Error updating todo:", error);
    throw error; // Re-throw the error if you need to handle it further up the call stack
  }
};

// export const deleteTodo = async (id: number): Promise<void> => {
//   await fetch(`${baseUrl}/tasks/${id}`, {
//     method: "DELETE",
//   });
// };

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const res = await fetch(`${baseUrl}/tasks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete the todo");
    }
  } catch (error) {
    console.error("Something went wrong, please try again");
    throw error;
  }
};
