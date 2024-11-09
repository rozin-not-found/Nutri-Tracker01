import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => item);
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },
  dataGridEditFormatter(obj) {
    return _.transform(obj, (result, value, key) => {
      if (_.isArray(value)) {
        result[key] = _.map(value, 'id');
      } else if (_.isObject(value)) {
        result[key] = value.id;
      } else {
        result[key] = value;
      }
    });
  },

  usersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.firstName);
  },
  usersOneListFormatter(val) {
    if (!val) return '';
    return val.firstName;
  },
  usersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.firstName };
    });
  },
  usersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.firstName, id: val.id };
  },

  menu_itemsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.item_name);
  },
  menu_itemsOneListFormatter(val) {
    if (!val) return '';
    return val.item_name;
  },
  menu_itemsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.item_name };
    });
  },
  menu_itemsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.item_name, id: val.id };
  },

  order_itemsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.menu_item);
  },
  order_itemsOneListFormatter(val) {
    if (!val) return '';
    return val.menu_item;
  },
  order_itemsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.menu_item };
    });
  },
  order_itemsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.menu_item, id: val.id };
  },

  ordersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.order_date);
  },
  ordersOneListFormatter(val) {
    if (!val) return '';
    return val.order_date;
  },
  ordersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.order_date };
    });
  },
  ordersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.order_date, id: val.id };
  },

  shopsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  shopsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  shopsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  shopsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  rolesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  rolesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  rolesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  rolesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  permissionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  permissionsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  permissionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  permissionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },
};
