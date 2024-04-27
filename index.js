const express = require("express");
const userRouter = require("./routers/user.router");

const app = express();

app.use(express.json())

const port = process.env.port || 5000;

app.use("/user", userRouter)

app.all("*", (req, res) =>{
    res.send("<h1>Error F8888r</h1>")
})

app.listen(port, () =>{
    console.log(`Running server in port ${port}`);
})

process.on("unhandledRejection", (err) =>{
    console.log(err.name, err.message);
    app.close(() =>{
        process.exit(1);
    })
})