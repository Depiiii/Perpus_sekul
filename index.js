/** load library express */
const express = require(`express`)

/** create object that instances of express */
const app = express()

/** define port of server */
const PORT = 8001

/** load library cors */
const cors = require(`cors`)
const auth = require(`./routes/auth.route`)

/** open CORS policy */
app.use(cors())
app.use(express.static(__dirname))
app.use(`/auth`, auth)

/** define all routes */
const adminRoute = require(`./routes/admin.route`)
const memberRoute = require(`./routes/member.route`)
const bookRoute = require(`./routes/book.route`)
const borrowRoute = require(`./routes/borrow.route`)

// ini endpoint ()kalau menjalankan ini(school library) /member itu dimasukkan ke thunder client
app.use(`/admin`, adminRoute)
app.use(`/book`, bookRoute)
app.use(`/member`, memberRoute)
app.use(`/borrow`, borrowRoute)


/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server of School's Library runs on port
    ${PORT}`)
})
