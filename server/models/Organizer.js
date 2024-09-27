import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const Organizer = sequelize.define('organizer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async (organizer) => {
      if (organizer.password) {
        const salt = await bcrypt.genSalt(10);
        organizer.password = await bcrypt.hash(organizer.password, salt);
      }
    }
  }
});


export default Organizer;
