const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {
  static rsvp(body, models) {
    return models.UserEvent.create({
        user_id: body.user_id,
        post_id: body.post_id
    }).then(() => {
    return Event.findOne({
        where: {
            id: body.event_id
        },
        attributes: [
          'id',
          'title',
          'date',
          'location',
          // use raw MySQL aggregate function query to get a count of how many userEvents the event has and return it under the name `userEvent_count`
          [
              sequelize.literal('(SELECT COUNT(*) FROM userEvent WHERE event.id = userEvent.event_id)'),
              'rsvp_count'
          ]
        ]
      });
    });
  }
}

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
