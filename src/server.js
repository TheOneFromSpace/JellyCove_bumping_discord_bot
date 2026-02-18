// keeps an server based program running
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is alive! version 1.0 final release (1.0.5)'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Web server running on port ${port}`));
