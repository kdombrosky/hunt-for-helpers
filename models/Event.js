const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {
  static rsvp(body, models) {
    return models.UserEvent.create({
      user_id: body.user_id,
      event_id: body.event_id
    }).then(() => {
      return Event.findOne({
        where: {
          id: body.event_id
        },
        attributes: [
          'id',
          'description',
          'location',
          'date',
          'title',
          'created_at'
          // [
          //   // sequelize.literal('(SELECT COUNT(*) FROM userevent WHERE post.id = vote.post_id)'),
          //   'vote_count'
          // ]
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
