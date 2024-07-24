import { sequelize } from '../config/database.js'
import { DataTypes } from 'sequelize';

const Todo = sequelize.define('task',{
    title:{
        type:DataTypes.STRING,
        validate:{
            max:150
        }
    },
    description:{
        type:DataTypes.TEXT
    },
    is_complete:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})
// sequelize.sync()
export default Todo;
