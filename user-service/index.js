const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/users/:str', (req, res) => {
    res.send(`User service !\n message: ${req.params.str}`);
})

app.listen(PORT, () => {
    console.log(`User service listening at http://localhost:${PORT}`);
});
