const { Router } = require("express");
const router = Router();

const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/tasksController");
const { isLoggedIn } = require("../middlewares");

router.use(isLoggedIn);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;