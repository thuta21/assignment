import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';
import Organizer from './Organizer.js';  // Import the Organizer model

const Event = sequelize.define('event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  images: {  // New images column
    type: DataTypes.STRING,  // Store image path as a string
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizerId: {  // Reference to the Organizer model
    type: DataTypes.INTEGER,
    references: {
      model: Organizer,
      key: 'id',
    },
    allowNull: false,
  }
});

// Define association: An Event belongs to an Organizer
Event.belongsTo(Organizer, { foreignKey: 'organizerId' });

export default Event;
