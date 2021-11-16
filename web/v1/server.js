const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/Signup.html'));
})

app.listen(8000, () => {
    console.log("Server is running...");
})