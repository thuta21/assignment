import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'assignment',
    'root',
    '',{
        dialect:'mysql',
        host:'localhost'
    }
);

const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Successfully connected to our db");
    } catch (error) {
        console.log(error);
    }
}

export { sequelize, connectToDb };
