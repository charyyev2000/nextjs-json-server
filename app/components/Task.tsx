"use client";

import { ITasks } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import Model from "./Model";
import { deleteTodo, editTodo } from "@/api";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: ITasks;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const router = useRouter();

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    console.log(taskToEdit, "task");

    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    router.refresh();
  };
  return (
    <>
      <tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
          <FiEdit
            onClick={() => setOpenModalEdit(true)}
            size={25}
            className="text-blue-500 cursor-pointer"
          />
          <Model modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className="font-bold text-large">Edit task</h3>
              <div className="modal-action ">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                />
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </Model>
          <FiTrash
            cursor="pointer"
            size={25}
            className="text-red-500"
            onClick={() => setOpenModalDeleted(true)}
          />

          <Model
            modalOpen={openModalDeleted}
            setModalOpen={setOpenModalDeleted}
          >
            <h3 className="text-lg">Do you really want to delete this todo</h3>
            <button
              className="btn"
              type="submit"
              onClick={() => handleDelete(task.id)}
            >
              Yes
            </button>
          </Model>
        </td>
      </tr>
    </>
  );
};

export default Task;
