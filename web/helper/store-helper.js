// stores-helper.js
import fs from 'fs/promises';

async function getStores() {
  const data = await fs.readFile('./helper/dummy/store-data.json');
    return JSON.parse(data);
}


async function searchStores(text) {
  console.log("Search text ",text);
  const data = await fs.readFile('./helper/dummy/search-data.json');
    return JSON.parse(data);
}

async function getPaginatedStores(page = 1, limit = 5) {
  const data = await getStores();
  const start = (page - 1) * limit; // calculate the start index
  return {
    stores: data.stores.slice(start, start + limit),
    page,
    limit,
  };
}

export { getStores, getPaginatedStores, searchStores };