const mongoose = require('mongoose');

// ── Collection Schema ─────────────────────────────────
const CollectionSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  origin: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'Saree',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ── Product Schema ────────────────────────────────────
const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  collectionSlug: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  material: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  occasion: {
    type: String,
    default: ''
  },
  details: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Collection = mongoose.model('Collection', CollectionSchema);
const Product = mongoose.model('Product', ProductSchema);

module.exports = {
  Collection,
  Product
};
