const express = require('express');
const app = express();
app.use(express.json())

// untuk memuat file middleware
const { midOne } = require(`../middlewares/simple-middleware`)

/** load book's controller */
const bookController = require(`../controllers/book.controller`)

/** create route to get data with method "GET" */
app.get("/",[midOne], bookController.getAllBooks)

/** create route to find book
* using method "POST" and path "find" */
app.post("/find", bookController.findBook)
/** create route to add new book using method "POST"
*
*/
app.post("/", bookController.addBook)
/** create route to add new book using method "POST"
*
*/

/** create route to delete book
* using method "DELETE" and define parameter for "id" */
app.delete("/:id", bookController.deleteBook)

/** create route to update book
*	using method "PUT"
*	and define parameter for "id" */
app.put("/:id", bookController.updateBook)

/** export app in order to load in another file */
module.exports = app