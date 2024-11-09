const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const shops = sequelize.define(
    'shops',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      address: {
        type: DataTypes.TEXT,
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

  shops.associate = (db) => {
    db.shops.belongsToMany(db.users, {
      as: 'receptionists',
      foreignKey: {
        name: 'shops_receptionistsId',
      },
      constraints: false,
      through: 'shopsReceptionistsUsers',
    });

    db.shops.belongsToMany(db.menu_items, {
      as: 'menu_items',
      foreignKey: {
        name: 'shops_menu_itemsId',
      },
      constraints: false,
      through: 'shopsMenu_itemsMenu_items',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.shops.hasMany(db.menu_items, {
      as: 'menu_items_shop',
      foreignKey: {
        name: 'shopId',
      },
      constraints: false,
    });

    //end loop

    db.shops.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.shops.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return shops;
};
