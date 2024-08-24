"use client";

import { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Model from "./Model";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const router = useRouter();

  const handleSubmitTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4,
      text: newTaskValue,
    });
    console.log(newTaskValue);
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new Task <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Model modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitTodo}>
          <h3 className="font-bold text-large">Add new task</h3>
          <div className="modal-action ">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
            />
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Model>
    </div>
  );
};

export default AddTask;
