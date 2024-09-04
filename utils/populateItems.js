const Item = require('../models/item'); 

const items = [
  { name: 'Polo T-Shirt', stock: 100 },
  { name: 'Lehnga', stock: 150 },
  { name: 'Bat', stock: 200 },
  { name: 'Mobile Phone', stock: 250 },
  { name: 'Aloo Bhujia', stock: 300 }
];

async function populateItems() {
  try {
   
    const existingItems = await Item.countDocuments({});
    if (existingItems > 0) {
      console.log('Items already populated.');
      return;
    }

    
    await Item.insertMany(items);
    console.log('Items added successfully.');
  } catch (error) {
    console.error('Error populating items:', error);
  }
}

populateItems();
