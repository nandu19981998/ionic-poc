import LRU from 'lru-cache'

const options = {
  max: 500,                 // The maximum size of the cache
  maxAge: 4 * 1000 * 60 * 60    // The maximum age in milliseconds
}
const cache = new LRU(options);

const put = (key, value) => {
    if (key === undefined || value === undefined) {
        console.log("Invalid cache key and value");
        return undefined;
    }
    cache.set(key, value);
    return cache;
};

const get = (key) => {
    // If the key is not found or the item has expired, get() will return undefined.
    return cache.get(key);
}

export default {
    put,
    get
}