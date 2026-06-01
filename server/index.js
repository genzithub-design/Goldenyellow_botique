require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const logger = require('./logger');

const { Collection, Product } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nknithish:300440Nk@drivingschool.zepr95d.mongodb.net/goldenyellow';
const JWT_SECRET = process.env.JWT_SECRET || 'goldenyellow_default_secret_jwt_key';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// ── Paths ─────────────────────────────────────────────
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// ── Middleware ─────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Admin Auth Middleware
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Boutique admin authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || !decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Session expired or unauthorized. Please re-authenticate.' });
    }
    req.user = decoded;
    next();
  });
}

// ── Multer (image upload) ──────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|avif/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
                allowed.test(file.mimetype);
    if (ok) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  }
});

// ── Authentication Route ──────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ error: 'Incorrect boutique admin password' });
});

// ── Image Upload ───────────────────────────────────────
app.post('/api/upload', authenticateAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

// ── Collections CRUD ───────────────────────────────────

// GET all collections with product counts
app.get('/api/collections', async (req, res) => {
  try {
    const collections = await Collection.find().sort({ createdAt: 1 }).lean();
    const enriched = await Promise.all(collections.map(async col => {
      const productCount = await Product.countDocuments({ collectionSlug: col.slug });
      return {
        ...col,
        productCount
      };
    }));
    res.json(enriched);
  } catch (err) {
    logger.error('Error fetching collections:', err);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

// POST create collection
app.post('/api/collections', authenticateAdmin, async (req, res) => {
  try {
    const { title, description, origin, type, image } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const exists = await Collection.findOne({ slug });
    if (exists) {
      return res.status(409).json({ error: 'A collection with this title already exists' });
    }

    const newCol = new Collection({
      slug,
      title,
      image: image || '',
      description: description || '',
      origin: origin || '',
      type: type || 'Saree'
    });

    await newCol.save();
    res.status(201).json(newCol);
  } catch (err) {
    logger.error('Error creating collection:', err);
    res.status(500).json({ error: 'Failed to create collection' });
  }
});

// PUT update collection
app.put('/api/collections/:slug', authenticateAdmin, async (req, res) => {
  try {
    const { title, description, origin, type, image } = req.body;
    const updated = await Collection.findOneAndUpdate(
      { slug: req.params.slug },
      {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(origin !== undefined && { origin }),
        ...(type && { type }),
        ...(image !== undefined && { image })
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Collection not found' });
    res.json(updated);
  } catch (err) {
    logger.error('Error updating collection:', err);
    res.status(500).json({ error: 'Failed to update collection' });
  }
});

// DELETE collection (Cascade removes products)
app.delete('/api/collections/:slug', authenticateAdmin, async (req, res) => {
  try {
    const deletedCol = await Collection.findOneAndDelete({ slug: req.params.slug });
    if (!deletedCol) return res.status(404).json({ error: 'Collection not found' });

    // Cascade delete products
    await Product.deleteMany({ collectionSlug: req.params.slug });

    res.json({ message: 'Collection and all associated products deleted successfully' });
  } catch (err) {
    logger.error('Error deleting collection:', err);
    res.status(500).json({ error: 'Failed to delete collection' });
  }
});

// ── Products CRUD ──────────────────────────────────────

// GET all products across all collections
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    res.json(products);
  } catch (err) {
    logger.error('Error fetching all products:', err);
    res.status(500).json({ error: 'Failed to fetch all products' });
  }
});

// GET products in collection
app.get('/api/collections/:slug/products', async (req, res) => {
  try {
    const exists = await Collection.findOne({ slug: req.params.slug });
    if (!exists) return res.status(404).json({ error: 'Collection not found' });

    const products = await Product.find({ collectionSlug: req.params.slug }).sort({ createdAt: 1 });
    res.json(products);
  } catch (err) {
    logger.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST create product
app.post('/api/collections/:slug/products', authenticateAdmin, async (req, res) => {
  try {
    const { slug } = req.params;
    const exists = await Collection.findOne({ slug });
    if (!exists) return res.status(404).json({ error: 'Collection not found' });

    const { name, price, color, material, image, description, occasion, details } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });

    const newProduct = new Product({
      id: `${slug.substring(0, 4)}-${uuidv4().substring(0, 8)}`,
      collectionSlug: slug,
      name,
      price: price || '',
      color: color || '',
      material: material || '',
      image: image || '',
      description: description || '',
      occasion: occasion || '',
      details: details || ''
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    logger.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT update product
app.put('/api/collections/:slug/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const { slug, id } = req.params;
    const updated = await Product.findOneAndUpdate(
      { id, collectionSlug: slug },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    logger.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE product
app.delete('/api/collections/:slug/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const { slug, id } = req.params;
    const deleted = await Product.findOneAndDelete({ id, collectionSlug: slug });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    logger.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ── Health check ───────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));

// Serve static assets from frontend build
const DIST_DIR = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  // Catch-all route to serve index.html for SPA routes (e.g. /admin, /collections)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

// ── DB Connection & Start ──────────────────────────────
mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.success('Connected to MongoDB successfully.');
    
    app.listen(PORT, () => {
      logger.info('Golden Yellow MongoDB Admin Server is running');
      logger.info(`Running at http://localhost:${PORT}`);
      logger.info(`MongoDB URI → ${MONGODB_URI}`);
      logger.info(`Uploads     → ${UPLOADS_DIR}`);
    });
  })
  .catch(err => {
    logger.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
