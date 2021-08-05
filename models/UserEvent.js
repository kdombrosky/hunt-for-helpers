const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class UserEvent extends Model {}

UserEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'event',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userEvent'
  }
);

<<<<<<< HEAD
module.exports = UserEvent;
=======
module.exports = UserEvent;
>>>>>>> 8133041c3e28123c6c5d87c3e9156135a6989d60
