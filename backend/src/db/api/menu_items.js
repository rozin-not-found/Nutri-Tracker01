const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Menu_itemsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const menu_items = await db.menu_items.create(
      {
        id: data.id || undefined,

        item_name: data.item_name || null,
        unit_price: data.unit_price || null,
        calories: data.calories || null,
        protein: data.protein || null,
        fats: data.fats || null,
        carbohydrates: data.carbohydrates || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await menu_items.setShop(data.shop || null, {
      transaction,
    });

    return menu_items;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const menu_itemsData = data.map((item, index) => ({
      id: item.id || undefined,

      item_name: item.item_name || null,
      unit_price: item.unit_price || null,
      calories: item.calories || null,
      protein: item.protein || null,
      fats: item.fats || null,
      carbohydrates: item.carbohydrates || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const menu_items = await db.menu_items.bulkCreate(menu_itemsData, {
      transaction,
    });

    // For each item created, replace relation files

    return menu_items;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const menu_items = await db.menu_items.findByPk(id, {}, { transaction });

    await menu_items.update(
      {
        item_name: data.item_name || null,
        unit_price: data.unit_price || null,
        calories: data.calories || null,
        protein: data.protein || null,
        fats: data.fats || null,
        carbohydrates: data.carbohydrates || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await menu_items.setShop(data.shop || null, {
      transaction,
    });

    return menu_items;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const menu_items = await db.menu_items.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of menu_items) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of menu_items) {
        await record.destroy({ transaction });
      }
    });

    return menu_items;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const menu_items = await db.menu_items.findByPk(id, options);

    await menu_items.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await menu_items.destroy({
      transaction,
    });

    return menu_items;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const menu_items = await db.menu_items.findOne({ where }, { transaction });

    if (!menu_items) {
      return menu_items;
    }

    const output = menu_items.get({ plain: true });

    output.order_items_menu_item = await menu_items.getOrder_items_menu_item({
      transaction,
    });

    output.shop = await menu_items.getShop({
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
        model: db.shops,
        as: 'shop',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.item_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('menu_items', 'item_name', filter.item_name),
        };
      }

      if (filter.unit_priceRange) {
        const [start, end] = filter.unit_priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            unit_price: {
              ...where.unit_price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            unit_price: {
              ...where.unit_price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.caloriesRange) {
        const [start, end] = filter.caloriesRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            calories: {
              ...where.calories,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            calories: {
              ...where.calories,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.proteinRange) {
        const [start, end] = filter.proteinRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            protein: {
              ...where.protein,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            protein: {
              ...where.protein,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.fatsRange) {
        const [start, end] = filter.fatsRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            fats: {
              ...where.fats,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            fats: {
              ...where.fats,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.carbohydratesRange) {
        const [start, end] = filter.carbohydratesRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            carbohydrates: {
              ...where.carbohydrates,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            carbohydrates: {
              ...where.carbohydrates,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.shop) {
        const listItems = filter.shop.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          shopId: { [Op.or]: listItems },
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
          count: await db.menu_items.count({
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
      : await db.menu_items.findAndCountAll({
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
          Utils.ilike('menu_items', 'item_name', query),
        ],
      };
    }

    const records = await db.menu_items.findAll({
      attributes: ['id', 'item_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['item_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.item_name,
    }));
  }
};
