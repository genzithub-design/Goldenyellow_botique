import { collections as defaultCollections, products as defaultProducts } from '../data';

const TOKEN_KEY = 'gy_admin_token';
const COLLECTIONS_KEY = 'gy_collections';
const PRODUCTS_KEY = 'gy_products';

// Helper to safely stringify and parse
const getStoredData = (key, defaultVal = []) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : defaultVal;
  } catch (e) {
    console.error(`Failed to parse key ${key}:`, e);
    return defaultVal;
  }
};

const setStoredData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Seed initial database if empty or sync with JSON changes
const seedDatabase = () => {
  const originalSlugs = ["kanchipuram-silk", "banarasi-silk", "cotton-weaves", "organza-sarees", "bridal-collection"];
  const originalProdIds = ["prod-kanchi-1", "prod-banarasi-1", "prod-cotton-1", "prod-organza-1", "prod-bridal-1"];

  let updatedCols = [];
  if (!localStorage.getItem(COLLECTIONS_KEY)) {
    updatedCols = defaultCollections;
    setStoredData(COLLECTIONS_KEY, defaultCollections);
  } else {
    const storedCols = getStoredData(COLLECTIONS_KEY);
    const newSlugs = defaultCollections.map(c => c.slug);
    
    // Filter out deleted defaults, keep updated defaults and custom ones
    updatedCols = storedCols
      .filter(col => {
        if (originalSlugs.includes(col.slug) && !newSlugs.includes(col.slug)) {
          return false;
        }
        return true;
      })
      .map(col => {
        const newDef = defaultCollections.find(c => c.slug === col.slug);
        if (newDef) {
          return { ...col, ...newDef };
        }
        return col;
      });

    // Add any completely new collections from defaultCollections
    defaultCollections.forEach(defCol => {
      if (!updatedCols.some(c => c.slug === defCol.slug)) {
        updatedCols.push(defCol);
      }
    });

    setStoredData(COLLECTIONS_KEY, updatedCols);
  }

  if (!localStorage.getItem(PRODUCTS_KEY)) {
    setStoredData(PRODUCTS_KEY, defaultProducts);
  } else {
    const storedProds = getStoredData(PRODUCTS_KEY);
    const newProdIds = defaultProducts.map(p => p.id);

    const updatedProds = storedProds
      .filter(prod => {
        if (originalProdIds.includes(prod.id) && !newProdIds.includes(prod.id)) {
          return false;
        }
        return true;
      })
      .map(prod => {
        const newDef = defaultProducts.find(p => p.id === prod.id);
        if (newDef) {
          return { ...prod, ...newDef };
        }
        return prod;
      });

    defaultProducts.forEach(defProd => {
      if (!updatedProds.some(p => p.id === defProd.id)) {
        updatedProds.push(defProd);
      }
    });

    // Also clean up products whose collection has been deleted
    const activeCollectionSlugs = updatedCols.map(c => c.slug);
    const finalProds = updatedProds.filter(p => activeCollectionSlugs.includes(p.collectionSlug));

    setStoredData(PRODUCTS_KEY, finalProds);
  }
};

// Auto-seed database when script is loaded
seedDatabase();

/**
 * Log in to admin panel.
 * @param {string} password 
 * @returns {Promise<{success: boolean, token: string}>}
 */
export async function loginAdmin(password) {
  // Simple check for password
  if (password === 'admin') {
    return { success: true, token: 'mock-token-' + Date.now() };
  }
  throw new Error('Incorrect password');
}

/**
 * Uploads a file by converting it to a base64 Data URL.
 * @param {File} file 
 * @returns {Promise<{url: string, filename: string}>}
 */
export function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ url: reader.result, filename: file.name });
    };
    reader.onerror = () => {
      reject(new Error('Failed to read and upload image'));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Fetches all collections with product counts.
 * @returns {Promise<Array>}
 */
export async function getCollections() {
  const collections = getStoredData(COLLECTIONS_KEY);
  const products = getStoredData(PRODUCTS_KEY);

  // Map productCount dynamically
  return collections.map(col => {
    const colProducts = products.filter(p => p.collectionSlug === col.slug);
    return {
      ...col,
      productCount: colProducts.length
    };
  });
}

/**
 * Creates a new collection.
 * @param {object} collectionData - { title, description, origin, type, image }
 * @returns {Promise<object>}
 */
export async function createCollection(collectionData) {
  const collections = getStoredData(COLLECTIONS_KEY);
  const slug = collectionData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  if (collections.some(c => c.slug === slug)) {
    throw new Error('Collection with a similar title already exists');
  }

  const newCollection = {
    ...collectionData,
    slug,
    weavingHistory: collectionData.weavingHistory || `Heritage handlooms crafted in the legacy of ${collectionData.origin || 'our master weavers'}.`
  };

  collections.push(newCollection);
  setStoredData(COLLECTIONS_KEY, collections);
  return newCollection;
}

/**
 * Updates an existing collection.
 * @param {string} slug 
 * @param {object} collectionData 
 * @returns {Promise<object>}
 */
export async function updateCollection(slug, collectionData) {
  const collections = getStoredData(COLLECTIONS_KEY);
  const index = collections.findIndex(c => c.slug === slug);
  if (index === -1) throw new Error('Collection not found');

  const updatedCollection = {
    ...collections[index],
    ...collectionData
  };

  collections[index] = updatedCollection;
  setStoredData(COLLECTIONS_KEY, collections);
  return updatedCollection;
}

/**
 * Deletes a collection and all of its products.
 * @param {string} slug 
 * @returns {Promise<{message: string}>}
 */
export async function deleteCollection(slug) {
  const collections = getStoredData(COLLECTIONS_KEY);
  const filteredCollections = collections.filter(c => c.slug !== slug);
  setStoredData(COLLECTIONS_KEY, filteredCollections);

  // Delete products associated with this collection
  const products = getStoredData(PRODUCTS_KEY);
  const filteredProducts = products.filter(p => p.collectionSlug !== slug);
  setStoredData(PRODUCTS_KEY, filteredProducts);

  return { message: 'Collection and all associated products deleted successfully' };
}

/**
 * Fetches all products inside a specific collection.
 * @param {string} slug 
 * @returns {Promise<Array>}
 */
export async function getProducts(slug) {
  const products = getStoredData(PRODUCTS_KEY);
  return products.filter(p => p.collectionSlug === slug);
}

/**
 * Creates a new product inside a collection.
 * @param {string} slug 
 * @param {object} productData - { name, price, color, material, image, description, occasion, details }
 * @returns {Promise<object>}
 */
export async function createProduct(slug, productData) {
  const products = getStoredData(PRODUCTS_KEY);
  const newProduct = {
    ...productData,
    id: 'prod-' + Math.random().toString(36).substr(2, 9),
    collectionSlug: slug,
    zariType: productData.zariType || "Genuine zari threads",
    weavingTechnique: productData.weavingTechnique || "Traditional Handloom",
    borderSize: productData.borderSize || "Medium Border",
    careInstructions: productData.careInstructions || "Dry clean only"
  };

  products.push(newProduct);
  setStoredData(PRODUCTS_KEY, products);
  return newProduct;
}

/**
 * Updates an existing product.
 * @param {string} slug 
 * @param {string} id 
 * @param {object} productData 
 * @returns {Promise<object>}
 */
export async function updateProduct(slug, id, productData) {
  const products = getStoredData(PRODUCTS_KEY);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Product not found');

  const updatedProduct = {
    ...products[index],
    ...productData
  };

  products[index] = updatedProduct;
  setStoredData(PRODUCTS_KEY, products);
  return updatedProduct;
}

/**
 * Deletes a product from a collection.
 * @param {string} slug 
 * @param {string} id 
 * @returns {Promise<{message: string}>}
 */
export async function deleteProduct(slug, id) {
  const products = getStoredData(PRODUCTS_KEY);
  const filteredProducts = products.filter(p => p.id !== id);
  setStoredData(PRODUCTS_KEY, filteredProducts);
  return { message: 'Product deleted successfully' };
}

/**
 * Fetches all products across all collections.
 * @returns {Promise<Array>}
 */
export async function getAllProducts() {
  return getStoredData(PRODUCTS_KEY);
}
