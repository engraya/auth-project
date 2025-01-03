require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');

const app = express();

app.use(express.json());






app.use('*', catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);





const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server  running on port ${PORT}`);
});