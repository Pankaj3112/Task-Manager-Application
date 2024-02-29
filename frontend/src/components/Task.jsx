import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useRecoilState } from "recoil";
import { taskListState } from "../recoil";

const Task = ({ task }) => {
  const [tasks, setTasks] = useRecoilState(taskListState);
  const [editable, setEditable] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleDelete = () => {
    const deleteTask = async () => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/api/tasks/${task._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTasks(tasks.filter((t) => t._id !== task._id));
		toast.success("Task deleted successfully");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

    deleteTask();
  };

  const handleCancelEdit = () => {
    setEditable(false);
    setEditedTask(task);
  };

  const handleSaveEdit = () => {
    console.log(editedTask);

    const updateTask = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/api/tasks/${task._id}`,
          editedTask,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTasks(
          tasks.map((t) => (t._id === task._id ? response.data.task : t))
        );
        setEditable(false);
		toast.success("Task updated successfully");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

    updateTask();
  };

  return (
    <div className="flex flex-row gap-4 w-full bg-white p-4 rounded-md shadow-md">
      {editable ? (
        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <input
              className="p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Title"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
            <textarea
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Description"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />

            <select
              className="p-2 border border-gray-300 rounded-md"
              value={editedTask.status}
              onChange={(e) =>
                setEditedTask({ ...editedTask, status: e.target.value })
              }
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex flex-col gap-4 items-end justify-center">
            <button
              onClick={handleCancelEdit}
              className="bg-blue-500 text-white rounded-md w-full p-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white rounded-md w-full p-2"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <p
              className="text-gray-500 text-sm w-[90vh] overflow-hidden text-wrap
		"
            >
              {task.description}
            </p>
            <p
              className="flex text-gray-500 text-sm  
			"
            >
              -- {task.status}
            </p>
          </div>
          <div className="flex flex-col gap-4 items-end justify-center">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setEditable(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700
		"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
