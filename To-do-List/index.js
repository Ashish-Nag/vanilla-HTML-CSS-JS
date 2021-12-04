const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];
let workItems = [];

app.get("/", (req, res) => {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("hi-IN", options);
    res.render("list", { theDay: day, listName: "Home", newListItem: items });
});

app.get("/work", (req, res) => {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-GB", options);
    res.render("list", { theDay: day, listName: "Work", newListItem: workItems });
});

app.post("/", (req, res) => {

    if (req.body.submitBtn == 'Home') {
        let item = req.body.newItem;
        items.push(item);
        res.redirect("/");
    } else if (req.body.submitBtn == 'Work') {
        let workItem = req.body.newItem;
        workItems.push(workItem);
        res.redirect("/work");
    }
});

app.listen(300, () => {
    console.log('server started at port 300');
})