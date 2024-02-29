import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import {
  filteredTasksSelector,
  statusFilterState,
  taskListState,
} from "../recoil";
import Task from "./Task";

import InfiniteScroll from "react-infinite-scroller";

const TaskList = () => {
  const filteredTasks = useRecoilValue(filteredTasksSelector);
  const [taskList, setTaskList] = useRecoilState(taskListState);
  const [status, setStatus] = useRecoilState(statusFilterState);
  const [page, setPage] = useState(2);
  const [scrollCompleted, setScrollCompleted] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/tasks?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.tasks.length === 0) {
        setScrollCompleted(true);
      } else {
        setTaskList([...taskList, ...response.data.tasks]);
        setPage(page + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

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

      <InfiniteScroll
        pageStart={1}
        loadMore={fetchTasks}
        hasMore={!scrollCompleted}
        loader={
          <div
            className="loader flex justify-center mt-4 w-full h-14"
            key={"123"}
          >
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-600 border-t-gray-300
			"></div>
          </div>
        }
      >
        <div className="mt-8 w-1/2 mx-auto flex flex-col gap-4 items-center">
          {filteredTasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default TaskList;
