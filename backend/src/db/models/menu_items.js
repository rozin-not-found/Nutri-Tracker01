const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const menu_items = sequelize.define(
    'menu_items',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      item_name: {
        type: DataTypes.TEXT,
      },

      unit_price: {
        type: DataTypes.DECIMAL,
      },

      calories: {
        type: DataTypes.INTEGER,
      },

      protein: {
        type: DataTypes.DECIMAL,
      },

      fats: {
        type: DataTypes.DECIMAL,
      },

      carbohydrates: {
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

  menu_items.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.menu_items.hasMany(db.order_items, {
      as: 'order_items_menu_item',
      foreignKey: {
        name: 'menu_itemId',
      },
      constraints: false,
    });

    //end loop

    db.menu_items.belongsTo(db.shops, {
      as: 'shop',
      foreignKey: {
        name: 'shopId',
      },
      constraints: false,
    });

    db.menu_items.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.menu_items.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return menu_items;
};
