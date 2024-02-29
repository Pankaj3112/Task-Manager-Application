import React from "react";
import { useRecoilState } from "recoil";
import { filteredTasksSelector, statusFilterState } from "../recoil";
import Task from "./Task";

const TaskList = () => {
  const [tasks, setTasks] = useRecoilState(filteredTasksSelector);
  const [status, setStatus] = useRecoilState(statusFilterState);

  return (
    <>
      <div className="mt-8 mx-auto w-1/2 flex items-center justify-end gap-4">
        <select
          className="p-2 px-4 border border-gray-300 rounded-md"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="mt-8 w-1/2 mx-auto flex flex-col gap-4 items-center">
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </>
  );
};

export default TaskList;
