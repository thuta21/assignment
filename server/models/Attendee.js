import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

const Attendee = sequelize.define('attendee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'events', // Name of the event table
      key: 'id',
    },
    allowNull: false,
  }
});

export default Attendee;
