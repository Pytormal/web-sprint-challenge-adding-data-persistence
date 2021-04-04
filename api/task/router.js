// build your `/api/tasks` router here
const express = require("express");

const tRouter = express.Router();
const Task = require("./model");

// 1 [GET] /api/resources

tRouter.get("/", async (req, res) => {
  try {
    const task = await Task.getAll();
    res.json(task);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "The task information could not be retrieved" });
  }
});

// 2 [GET] /api/resources/:id

tRouter.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      req.task = task;
      res.json(req.task);
    } else {
      res.status(404).json({
        message: "The task with the specified ID does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "The task information could not be retrieved" });
  }
});

// 3 [POST] /api/resources

tRouter.post("/", async (req, res) => {
  const task = req.body;
  if (!task.task_description) {
    res
      .status(400)
      .json({
        message: "Please provide a description for the task",
      });
  } else {
    try {
      const newTask = await Task.insert(task);
      res.status(201).json(newTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:
          "There was an error while saving the task to the database, try another name",
      });
    }
  }
});

// 4 [PUT] /api/resources/:id

// tRouter.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const task = req.body;
//   try {
//     const updatePost = await Task.update(id, task);
//     res.status(200).json(task);
//     if (updatePost) {
//       res.status(404).json({
//         message: "The task with the specified ID does not exist",
//       });
//     } else {
//       res.status(400).json({
//         message: "Please provide title and contents for the task",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "The task information could not be modified" });
//   }
// });

// 5 [DELETE] /api/resources/:id

// tRouter.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const task = await Task.remove(id);
//     if (task) {
//       res.json(task);
//     } else {
//       res
//         .status(404)
//         .json({ message: "The task with the specified ID does not exist" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "The task could not be removed" });
//   }
// });

// 6 [GET] /api/resources/:id/comments

// tRouter.get("/:id/comments", async (req, res) => {
//   try {
//     const task = await Task.findPostComments(postId);
//     if (task) {
//       res.json(task);
//     } else {
//       res.status(404).json({
//         message: "The task with the specified ID does not exist",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "The comments information could not be retrieved" });
//   }
// });

module.exports = tRouter;