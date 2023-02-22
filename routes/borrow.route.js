/** load library express */
const express = require(`express`)

/** initiate object that instance of express */ 
const app = express()

/** allow to read 'request' with json type */ 
app.use(express.json())

/** load borrow's controller */ 
const borrowController = require(`../controllers/borrow.controller`)
let { validateBorrow } = require(`../middlewares/borrow-validation`)
const { authorize } = require(`../controllers/auth.controller`)

/** create route to add new borrowing book */ 
app.post("/",[authorize],[validateBorrow], borrowController.addBorrowing)

/** create route to update borrowed book based on ID */ 
app.put("/:id",[authorize],[validateBorrow], borrowController.updateBorrowing)

/** create toute to delete borrowed book based on ID */ 
app.delete("/:id",[authorize], borrowController.deleteBorrowing)

/** create route to return book */ 
app.get("/return/:id",[authorize], borrowController.returnBook)
 
/** create route to get all borrowed book */ 
app.get("/tampil",[authorize], borrowController.getBorrow)

app.post("/find",[authorize], borrowController.filterBorrow)
module.exports = app