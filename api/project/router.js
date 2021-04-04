// build your `/api/projects` router here
const express = require("express");

const pRouter = express.Router();
const Project = require("./model");

// 1 [GET] /api/projects

pRouter.get("/", async (req, res) => {
  try {
    const project = await Project.getAll();
    res.json(project);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "The project information could not be retrieved" });
  }
});

// 2 [GET] /api/projects/:id

pRouter.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
      if (project) {
        req.project = project
      res.json(req.project);
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "The project information could not be retrieved" });
  }
});

// 3 [POST] /api/projects

pRouter.post("/", async (req, res) => {
  const project = req.body;
  if (!project.project_name) {
    res
      .status(400)
      .json({ message: "Please provide name and description for the project" });
  } else {
    try {
      const newProj = await Project.insert(project);
      res.status(201).json(newProj);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the project to the database, try another name",
      });
    }
  }
});

// 4 [PUT] /api/projects/:id

// pRouter.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const project = req.body;
//   try {
//     const updatePost = await Project.update(id, project);
//     res.status(200).json(project);
//     if (updatePost) {
//       res.status(404).json({
//         message: "The project with the specified ID does not exist",
//       });
//     } else {
//       res.status(400).json({
//         message: "Please provide title and contents for the project",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "The project information could not be modified" });
//   }
// });

// 5 [DELETE] /api/projects/:id

// pRouter.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const project = await Project.remove(id);
//     if (project) {
//       res.json(project);
//     } else {
//       res
//         .status(404)
//         .json({ message: "The project with the specified ID does not exist" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "The project could not be removed" });
//   }
// });

// 6 [GET] /api/projects/:id/comments

// pRouter.get("/:id/comments", async (req, res) => {
//   try {
//     const project = await Project.findPostComments(postId);
//     if (project) {
//       res.json(project);
//     } else {
//       res.status(404).json({
//         message: "The project with the specified ID does not exist",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "The comments information could not be retrieved" });
//   }
// });

module.exports = pRouter;
