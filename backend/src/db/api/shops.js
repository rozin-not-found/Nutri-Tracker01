const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ShopsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const shops = await db.shops.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        address: data.address || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await shops.setReceptionists(data.receptionists || [], {
      transaction,
    });

    await shops.setMenu_items(data.menu_items || [], {
      transaction,
    });

    return shops;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const shopsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      address: item.address || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const shops = await db.shops.bulkCreate(shopsData, { transaction });

    // For each item created, replace relation files

    return shops;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const shops = await db.shops.findByPk(id, {}, { transaction });

    await shops.update(
      {
        name: data.name || null,
        address: data.address || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await shops.setReceptionists(data.receptionists || [], {
      transaction,
    });

    await shops.setMenu_items(data.menu_items || [], {
      transaction,
    });

    return shops;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const shops = await db.shops.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of shops) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of shops) {
        await record.destroy({ transaction });
      }
    });

    return shops;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const shops = await db.shops.findByPk(id, options);

    await shops.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await shops.destroy({
      transaction,
    });

    return shops;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const shops = await db.shops.findOne({ where }, { transaction });

    if (!shops) {
      return shops;
    }

    const output = shops.get({ plain: true });

    output.menu_items_shop = await shops.getMenu_items_shop({
      transaction,
    });

    output.receptionists = await shops.getReceptionists({
      transaction,
    });

    output.menu_items = await shops.getMenu_items({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'receptionists',
        through: filter.receptionists
          ? {
              where: {
                [Op.or]: filter.receptionists.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.receptionists ? true : null,
      },

      {
        model: db.menu_items,
        as: 'menu_items',
        through: filter.menu_items
          ? {
              where: {
                [Op.or]: filter.menu_items.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.menu_items ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('shops', 'name', filter.name),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('shops', 'address', filter.address),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.shops.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.shops.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('shops', 'name', query),
        ],
      };
    }

    const records = await db.shops.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
