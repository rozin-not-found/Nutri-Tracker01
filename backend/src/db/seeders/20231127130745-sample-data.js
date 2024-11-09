const db = require('../models');
const Users = db.users;

const MenuItems = db.menu_items;

const OrderItems = db.order_items;

const Orders = db.orders;

const Shops = db.shops;

const MenuItemsData = [
  {
    item_name: 'Grilled Chicken Salad',

    unit_price: 12.99,

    calories: 350,

    protein: 30,

    fats: 10,

    carbohydrates: 20,

    // type code here for "relation_one" field
  },

  {
    item_name: 'Veggie Wrap',

    unit_price: 8.99,

    calories: 250,

    protein: 10,

    fats: 5,

    carbohydrates: 35,

    // type code here for "relation_one" field
  },

  {
    item_name: 'Quinoa Bowl',

    unit_price: 10.99,

    calories: 400,

    protein: 15,

    fats: 12,

    carbohydrates: 50,

    // type code here for "relation_one" field
  },

  {
    item_name: 'Smoothie',

    unit_price: 6.99,

    calories: 200,

    protein: 5,

    fats: 2,

    carbohydrates: 40,

    // type code here for "relation_one" field
  },
];

const OrderItemsData = [
  {
    // type code here for "relation_one" field

    quantity: 1,

    total_price: 12.99,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    quantity: 1,

    total_price: 6.99,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    quantity: 2,

    total_price: 17.98,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    quantity: 1,

    total_price: 7.99,

    // type code here for "relation_one" field
  },
];

const OrdersData = [
  {
    order_date: new Date('2023-10-01T12:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    order_date: new Date('2023-10-02T14:30:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    order_date: new Date('2023-10-03T09:15:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    order_date: new Date('2023-10-04T18:45:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },
];

const ShopsData = [
  {
    name: 'Healthy Bites',

    address: '123 Green St, Springfield',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Nutri Delights',

    address: '456 Wellness Ave, Metropolis',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Fit Foods',

    address: '789 Fitness Rd, Gotham',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },

  {
    name: 'Green Eats',

    address: '321 Eco Ln, Star City',

    // type code here for "relation_many" field

    // type code here for "relation_many" field
  },
];

// Similar logic for "relation_many"

async function associateMenuItemWithShop() {
  const relatedShop0 = await Shops.findOne({
    offset: Math.floor(Math.random() * (await Shops.count())),
  });
  const MenuItem0 = await MenuItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (MenuItem0?.setShop) {
    await MenuItem0.setShop(relatedShop0);
  }

  const relatedShop1 = await Shops.findOne({
    offset: Math.floor(Math.random() * (await Shops.count())),
  });
  const MenuItem1 = await MenuItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (MenuItem1?.setShop) {
    await MenuItem1.setShop(relatedShop1);
  }

  const relatedShop2 = await Shops.findOne({
    offset: Math.floor(Math.random() * (await Shops.count())),
  });
  const MenuItem2 = await MenuItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (MenuItem2?.setShop) {
    await MenuItem2.setShop(relatedShop2);
  }

  const relatedShop3 = await Shops.findOne({
    offset: Math.floor(Math.random() * (await Shops.count())),
  });
  const MenuItem3 = await MenuItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (MenuItem3?.setShop) {
    await MenuItem3.setShop(relatedShop3);
  }
}

async function associateOrderItemWithMenu_item() {
  const relatedMenu_item0 = await MenuItems.findOne({
    offset: Math.floor(Math.random() * (await MenuItems.count())),
  });
  const OrderItem0 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (OrderItem0?.setMenu_item) {
    await OrderItem0.setMenu_item(relatedMenu_item0);
  }

  const relatedMenu_item1 = await MenuItems.findOne({
    offset: Math.floor(Math.random() * (await MenuItems.count())),
  });
  const OrderItem1 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (OrderItem1?.setMenu_item) {
    await OrderItem1.setMenu_item(relatedMenu_item1);
  }

  const relatedMenu_item2 = await MenuItems.findOne({
    offset: Math.floor(Math.random() * (await MenuItems.count())),
  });
  const OrderItem2 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (OrderItem2?.setMenu_item) {
    await OrderItem2.setMenu_item(relatedMenu_item2);
  }

  const relatedMenu_item3 = await MenuItems.findOne({
    offset: Math.floor(Math.random() * (await MenuItems.count())),
  });
  const OrderItem3 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (OrderItem3?.setMenu_item) {
    await OrderItem3.setMenu_item(relatedMenu_item3);
  }
}

async function associateOrderItemWithOrder() {
  const relatedOrder0 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem0 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (OrderItem0?.setOrder) {
    await OrderItem0.setOrder(relatedOrder0);
  }

  const relatedOrder1 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem1 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (OrderItem1?.setOrder) {
    await OrderItem1.setOrder(relatedOrder1);
  }

  const relatedOrder2 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem2 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (OrderItem2?.setOrder) {
    await OrderItem2.setOrder(relatedOrder2);
  }

  const relatedOrder3 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem3 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (OrderItem3?.setOrder) {
    await OrderItem3.setOrder(relatedOrder3);
  }
}

async function associateOrderWithCustomer() {
  const relatedCustomer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setCustomer) {
    await Order0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setCustomer) {
    await Order1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setCustomer) {
    await Order2.setCustomer(relatedCustomer2);
  }

  const relatedCustomer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setCustomer) {
    await Order3.setCustomer(relatedCustomer3);
  }
}

async function associateOrderWithReceptionist() {
  const relatedReceptionist0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setReceptionist) {
    await Order0.setReceptionist(relatedReceptionist0);
  }

  const relatedReceptionist1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setReceptionist) {
    await Order1.setReceptionist(relatedReceptionist1);
  }

  const relatedReceptionist2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setReceptionist) {
    await Order2.setReceptionist(relatedReceptionist2);
  }

  const relatedReceptionist3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setReceptionist) {
    await Order3.setReceptionist(relatedReceptionist3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

// Similar logic for "relation_many"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await MenuItems.bulkCreate(MenuItemsData);

    await OrderItems.bulkCreate(OrderItemsData);

    await Orders.bulkCreate(OrdersData);

    await Shops.bulkCreate(ShopsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateMenuItemWithShop(),

      await associateOrderItemWithMenu_item(),

      await associateOrderItemWithOrder(),

      await associateOrderWithCustomer(),

      await associateOrderWithReceptionist(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('menu_items', null, {});

    await queryInterface.bulkDelete('order_items', null, {});

    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('shops', null, {});
  },
};
