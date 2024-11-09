const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const order_items = sequelize.define(
    'order_items',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      quantity: {
        type: DataTypes.INTEGER,
      },

      total_price: {
        type: DataTypes.DECIMAL,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  order_items.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.order_items.belongsTo(db.menu_items, {
      as: 'menu_item',
      foreignKey: {
        name: 'menu_itemId',
      },
      constraints: false,
    });

    db.order_items.belongsTo(db.orders, {
      as: 'order',
      foreignKey: {
        name: 'orderId',
      },
      constraints: false,
    });

    db.order_items.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.order_items.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return order_items;
};
