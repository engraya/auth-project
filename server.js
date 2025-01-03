require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');


// APPLICATION ROUTES AND MIDDLEWARES
const authRouter = require('./routes/authRoute');


const app = express();

app.use(express.json());

// APP ROUTES MIDDLEWARES
app.use('/api/auth', authRouter);


const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server  running on port ${PORT}`);
});