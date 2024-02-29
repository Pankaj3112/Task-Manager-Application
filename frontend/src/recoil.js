import { atom, selector } from "recoil";
import { getStoredAuth, parseJwt } from "./utils";
import axios from "axios";

export const taskListState = atom({
  key: "taskListState",
  default: selector({
    key: "taskListState/default",
    get: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.tasks;
    },
  }),
});

export const authState = atom({
  key: "authState",
  default: {
    token: getStoredAuth(),
  },
});

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    const { token } = get(authState);
    if (!token) return null;
    return parseJwt(token);
  },
});

// Atom for storing task status filter
export const statusFilterState = atom({
  key: "statusFilterState",
  default: "All",
});

// Selector to get filtered tasks by status
export const filteredTasksSelector = selector({
  key: "filteredTasksSelector",
  get: ({ get }) => {
    const status = get(statusFilterState);
    const tasks = get(taskListState);

    switch (status) {
      case "To Do":
        return tasks.filter((task) => task.status === "To Do");
      case "In Progress":
        return tasks.filter((task) => task.status === "In Progress");
      case "Done":
        return tasks.filter((task) => task.status === "Done");
      default:
        return tasks;
    }
  },
});
