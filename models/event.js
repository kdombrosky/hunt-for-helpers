const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      location: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [2, 25],
              isAlpha: true, 
            }
            
        }, 
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        attendance: {
          type: DataTypes.INTEGER,
          allowNull: true,
        //   references: {
        //     model: 'attendance',
        //     key: 'id'
        //   }
        },
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'event'
    }
  );
  
module.exports = Event;