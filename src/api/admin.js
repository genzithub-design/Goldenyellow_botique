const API_BASE = 'https://goldenyellow-botique-server-md5q5imne.vercel.app/api';
const TOKEN_KEY = 'gy_admin_token';

function getHeaders(extraHeaders = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    ...extraHeaders,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

/**
 * Log in to admin panel via the server.
 * @param {string} password 
 * @returns {Promise<{success: boolean, token: string}>}
 */
export async function loginAdmin(password) {
  const response = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to authenticate');
  }

  return response.json();
}

/**
 * Uploads a file to the server.
 * @param {File} file 
 * @returns {Promise<{url: string, filename: string}>}
 */
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: getHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to upload image');
  }

  return response.json();
}

/**
 * Fetches all collections with product counts.
 * @returns {Promise<Array>}
 */
export async function getCollections() {
  const response = await fetch(`${API_BASE}/collections`);
  if (!response.ok) throw new Error('Failed to fetch collections');
  return response.json();
}

/**
 * Creates a new collection.
 * @param {object} collectionData - { title, description, origin, type, image }
 * @returns {Promise<object>}
 */
export async function createCollection(collectionData) {
  const response = await fetch(`${API_BASE}/collections`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(collectionData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to create collection');
  }

  return response.json();
}

/**
 * Updates an existing collection.
 * @param {string} slug 
 * @param {object} collectionData 
 * @returns {Promise<object>}
 */
export async function updateCollection(slug, collectionData) {
  const response = await fetch(`${API_BASE}/collections/${slug}`, {
    method: 'PUT',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(collectionData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to update collection');
  }

  return response.json();
}

/**
 * Deletes a collection and all of its products.
 * @param {string} slug 
 * @returns {Promise<{message: string}>}
 */
export async function deleteCollection(slug) {
  const response = await fetch(`${API_BASE}/collections/${slug}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to delete collection');
  }

  return response.json();
}

/**
 * Fetches all products inside a specific collection.
 * @param {string} slug 
 * @returns {Promise<Array>}
 */
export async function getProducts(slug) {
  const response = await fetch(`${API_BASE}/collections/${slug}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

/**
 * Creates a new product inside a collection.
 * @param {string} slug 
 * @param {object} productData - { name, price, color, material, image, description, occasion, details }
 * @returns {Promise<object>}
 */
export async function createProduct(slug, productData) {
  const response = await fetch(`${API_BASE}/collections/${slug}/products`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to create product');
  }

  return response.json();
}

/**
 * Updates an existing product.
 * @param {string} slug 
 * @param {string} id 
 * @param {object} productData 
 * @returns {Promise<object>}
 */
export async function updateProduct(slug, id, productData) {
  const response = await fetch(`${API_BASE}/collections/${slug}/products/${id}`, {
    method: 'PUT',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to update product');
  }

  return response.json();
}

/**
 * Deletes a product from a collection.
 * @param {string} slug 
 * @param {string} id 
 * @returns {Promise<{message: string}>}
 */
export async function deleteProduct(slug, id) {
  const response = await fetch(`${API_BASE}/collections/${slug}/products/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to delete product');
  }

  return response.json();
}

/**
 * Fetches all products across all collections.
 * @returns {Promise<Array>}
 */
export async function getAllProducts() {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) throw new Error('Failed to fetch all products');
  return response.json();
}
