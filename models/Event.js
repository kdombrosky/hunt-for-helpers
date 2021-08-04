const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}
// add title and description
Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false

      },
      description: {
        type: DataTypes.STRING,
        allowNull: false

      },
      location: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [2, 25]
            }
            
        }, 
      date: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
              isDate: true
          }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
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
