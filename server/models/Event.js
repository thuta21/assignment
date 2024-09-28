import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';
import Organizer from './Organizer.js';

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
  images: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Organizer,
      key: 'id',
    },
    allowNull: false,
  }
});

Event.belongsTo(Organizer, { foreignKey: 'organizerId' });

export default Event;
