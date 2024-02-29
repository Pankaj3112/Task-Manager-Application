import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useRecoilState } from "recoil";
import { taskListState } from "../recoil";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [tasks, setTasks] = useRecoilState(taskListState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title || !task.description) {
      toast.error("Please fill all fields");
      return;
    }

    const addTask = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/tasks`,
          task,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTasks([response.data.task, ...tasks]);
		setTask({ title: "", description: "" });
        toast.success("Task added successfully");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

    addTask();
  };

  return (
    <div className="mt-8">
      <form
        className="flex flex-col items-center gap-4 w-1/5 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <input
              className="p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <textarea
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>
        </div>
        <button
          className=" bg-blue-500 text-white rounded-md w-full p-3"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
