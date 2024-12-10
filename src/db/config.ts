// import { Sequelize } from "sequelize";

// // Initialize the Sequelize database

// export const initDB =  () => {
//   return  new Sequelize({
//     dialect: "sqlite",
//     storage: "./database.sqlite",
//   });
// };

const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

export const initDB = () => {
    mongoose
        .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to %s", MONGODB_URL);
            console.log("App is running on Port");
            console.log("Press CTRL + C to stop the process. \n");
        })
        .catch((error: Error) => {
            console.error("App starting error:", error.message);
            process.exit(1);
        });
    return mongoose.connection;
}
