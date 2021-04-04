// build your `/api/resources` router here
const express = require("express");

const rRouter = express.Router();
const Resource = require("./model");

// 1 [GET] /api/resources

rRouter.get("/", async (req, res) => {
  try {
    const resource = await Resource.getAll();
    res.json(resource);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "The resource information could not be retrieved" });
  }
});

// 2 [GET] /api/resources/:id

rRouter.get("/:id", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (resource) {
      req.resource = resource;
      res.json(req.resource);
    } else {
      res.status(404).json({
        message: "The resource with the specified ID does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "The resource information could not be retrieved" });
  }
});

// 3 [POST] /api/resources

rRouter.post("/", async (req, res) => {
  const resource = req.body;
  if (!resource.resource_name) {
    res
      .status(400)
      .json({ message: "Please provide name and description for the resource" });
  } else {
    try {
      const newRes = await Resource.insert(resource);
      res.status(201).json(newRes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:
          "There was an error while saving the resource to the database, try another name",
      });
    }
  }
});

// 4 [PUT] /api/resources/:id

// rRouter.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const resource = req.body;
//   try {
//     const updatePost = await Resource.update(id, resource);
//     res.status(200).json(resource);
//     if (updatePost) {
//       res.status(404).json({
//         message: "The resource with the specified ID does not exist",
//       });
//     } else {
//       res.status(400).json({
//         message: "Please provide title and contents for the resource",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "The resource information could not be modified" });
//   }
// });

// 5 [DELETE] /api/resources/:id

// rRouter.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const resource = await Resource.remove(id);
//     if (resource) {
//       res.json(resource);
//     } else {
//       res
//         .status(404)
//         .json({ message: "The resource with the specified ID does not exist" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "The resource could not be removed" });
//   }
// });

// 6 [GET] /api/resources/:id/comments

// rRouter.get("/:id/comments", async (req, res) => {
//   try {
//     const resource = await Resource.findPostComments(postId);
//     if (resource) {
//       res.json(resource);
//     } else {
//       res.status(404).json({
//         message: "The resource with the specified ID does not exist",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "The comments information could not be retrieved" });
//   }
// });

module.exports = rRouter;