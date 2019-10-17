const commentController = require("../controllers/commentController");
const routes = [
    {
        method: "GET",
        url: "/api/comments",
        handler: commentController.getComments
    },
    {
        method: "POST",
        url: "/api/comment",
        handler: commentController.addComment
    }
];

module.exports = routes;