import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, ArrowLeft, Upload, Link as LinkIcon, 
  Sparkles, ShieldAlert, CheckCircle, X, ExternalLink, Image as ImageIcon,
  FolderPlus, Package, LogOut, ChevronRight, RefreshCw
} from 'lucide-react';
import { 
  getCollections, createCollection, updateCollection, deleteCollection,
  getProducts, createProduct, updateProduct, deleteProduct, uploadImage,
  loginAdmin
} from '../api/admin';

const TOKEN_KEY = 'gy_admin_token';

export default function Admin() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem(TOKEN_KEY);
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Collections state
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null); // When inside a collection
  
  // Products state
  const [products, setProducts] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Modals / Editors state
  const [colModal, setColModal] = useState({ open: false, mode: 'create', data: null });
  const [prodModal, setProdModal] = useState({ open: false, mode: 'create', data: null });

  // Form states
  const [colForm, setColForm] = useState({ title: '', description: '', origin: '', type: 'Saree', image: '' });
  const [prodForm, setProdForm] = useState({ name: '', price: '', color: '', material: '', image: '', description: '', occasion: '', details: '' });
  
  // File upload state for forms
  const [uploadingImage, setUploadingImage] = useState(false);

  // Load collections
  useEffect(() => {
    if (isAuthenticated) {
      fetchCollectionsList();
    }
  }, [isAuthenticated]);

  // Load products when entering a collection
  useEffect(() => {
    if (selectedCollection) {
      fetchProductsList(selectedCollection.slug);
    } else {
      setProducts([]);
    }
  }, [selectedCollection]);

  // Show Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchCollectionsList = async () => {
    setLoading(true);
    try {
      const data = await getCollections();
      setCollections(data);
    } catch (err) {
      showToast(err.message || 'Error loading collections', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsList = async (slug) => {
    setLoading(true);
    try {
      const data = await getProducts(slug);
      setProducts(data);
    } catch (err) {
      showToast(err.message || 'Error loading products', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Auth Submit
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');
    try {
      const res = await loginAdmin(password);
      if (res.success && res.token) {
        localStorage.setItem(TOKEN_KEY, res.token);
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setAuthError('Authentication failed.');
      }
    } catch (err) {
      setAuthError(err.message || 'Incorrect boutique admin password.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(TOKEN_KEY);
    setSelectedCollection(null);
  };

  // Upload file helper
  const handleImageFileChange = async (e, formType) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadImage(file);
      if (formType === 'collection') {
        setColForm(prev => ({ ...prev, image: res.url }));
      } else {
        setProdForm(prev => ({ ...prev, image: res.url }));
      }
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Collection CRUD logic
  const handleOpenColModal = (mode, data = null) => {
    if (mode === 'create') {
      setColForm({ title: '', description: '', origin: '', type: 'Saree', image: '' });
    } else if (mode === 'edit' && data) {
      setColForm({
        title: data.title,
        description: data.description,
        origin: data.origin,
        type: data.type || 'Saree',
        image: data.image
      });
    }
    setColModal({ open: true, mode, data });
  };

  const handleColSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (colModal.mode === 'create') {
        await createCollection(colForm);
        showToast('Collection created successfully!');
      } else {
        await updateCollection(colModal.data.slug, colForm);
        showToast('Collection updated successfully!');
      }
      setColModal({ open: false, mode: 'create', data: null });
      fetchCollectionsList();
    } catch (err) {
      showToast(err.message || 'Error processing collection', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCol = async (slug, title) => {
    if (!window.confirm(`Are you absolutely sure you want to delete the "${title}" collection? This will delete all products inside it as well!`)) {
      return;
    }
    setLoading(true);
    try {
      await deleteCollection(slug);
      showToast(`Collection "${title}" and its products deleted.`);
      fetchCollectionsList();
      if (selectedCollection?.slug === slug) {
        setSelectedCollection(null);
      }
    } catch (err) {
      showToast(err.message || 'Error deleting collection', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Product CRUD logic
  const handleOpenProdModal = (mode, data = null) => {
    if (mode === 'create') {
      setProdForm({ name: '', price: '', color: '', material: '', image: '', description: '', occasion: '', details: '' });
    } else if (mode === 'edit' && data) {
      setProdForm({
        name: data.name,
        price: data.price,
        color: data.color,
        material: data.material,
        image: data.image,
        description: data.description,
        occasion: data.occasion,
        details: data.details
      });
    }
    setProdModal({ open: true, mode, data });
  };

  const handleProdSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCollection) return;
    setLoading(true);
    try {
      if (prodModal.mode === 'create') {
        await createProduct(selectedCollection.slug, prodForm);
        showToast('Product added successfully!');
      } else {
        await updateProduct(selectedCollection.slug, prodModal.data.id, prodForm);
        showToast('Product updated successfully!');
      }
      setProdModal({ open: false, mode: 'create', data: null });
      fetchProductsList(selectedCollection.slug);
    } catch (err) {
      showToast(err.message || 'Error saving product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProd = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove the product "${name}"?`)) {
      return;
    }
    setLoading(true);
    try {
      await deleteProduct(selectedCollection.slug, id);
      showToast(`Product "${name}" removed.`);
      fetchProductsList(selectedCollection.slug);
    } catch (err) {
      showToast(err.message || 'Error deleting product', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ── Password Gate UI ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,14,29,0.18)_0%,transparent_60%)] pointer-events-none z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-[#1B0509]/80 backdrop-blur-md border border-gold-accent/30 rounded-2xl p-8 shadow-2xl relative z-10"
        >
          {/* Decorative Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold-accent/40 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold-accent/40 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold-accent/40 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold-accent/40 rounded-br-2xl" />

          <div className="flex flex-col items-center text-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold-accent/10 border border-gold-accent/40 flex items-center justify-center text-gold-accent mb-2">
              <ShieldAlert size={24} />
            </div>
            <span className="text-[9px] uppercase tracking-[0.35em] text-gold-accent font-bold">
              Golden Yellow Boutique
            </span>
            <h1 className="font-serif text-2xl text-cream-100 tracking-wide font-light">
              Boutique Admin Panel
            </h1>
          </div>

          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-cream-300 font-bold">
                Enter Admin Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border border-gold-accent/20 rounded-lg px-4 py-3 text-cream-100 text-sm focus:outline-none focus:border-gold-accent transition-colors"
                required
              />
            </div>

            {authError && (
              <p className="text-red-400 text-xs font-light">{authError}</p>
            )}

            <button
              type="submit"
              className="mt-2 w-full bg-gold-accent hover:bg-gold-vintage text-black font-semibold text-xs uppercase tracking-widest py-3.5 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Authenticate Portal <ChevronRight size={14} />
            </button>
          </form>

          <p className="text-[9px] text-center text-cream-400/50 mt-6 tracking-wide">
            Secure connection • Authorized personnel only
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Main Dashboard UI ──
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 min-h-screen">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-5 py-3 rounded-full border shadow-2xl backdrop-blur-md ${
              toast.type === 'error' 
                ? 'bg-red-950/80 border-red-500/50 text-red-200' 
                : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
            }`}
          >
            {toast.type === 'error' ? <ShieldAlert size={16} /> : <CheckCircle size={16} />}
            <span className="text-xs font-medium tracking-wide">{toast.message}</span>
            <button onClick={() => setToast(null)} className="hover:opacity-75 pl-2">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-gold-200/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="text-gold-accent animate-pulse" size={16} />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-accent font-bold">
              Management Portal
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-cream-100 tracking-wide font-light flex items-center gap-3">
            Boutique Dashboard
            {loading && <RefreshCw size={20} className="animate-spin text-gold-accent" />}
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={fetchCollectionsList}
            className="flex items-center justify-center gap-1.5 px-4 py-2 border border-gold-accent/20 hover:border-gold-accent/40 rounded-full text-xs text-cream-200 hover:text-white transition-colors"
          >
            <RefreshCw size={12} /> Sync Data
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 px-4 py-2 border border-red-500/20 hover:border-red-500/40 rounded-full text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut size={12} /> Log Out
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          PANEL 1: COLLECTIONS VIEW
          ──────────────────────────────────────────────────────── */}
      {!selectedCollection ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-cream-100 tracking-wide">Boutique Collections</h2>
              <p className="text-xs text-cream-400 font-light">Create, edit, or drill down into collections to manage stock.</p>
            </div>
            <button
              onClick={() => handleOpenColModal('create')}
              className="bg-gold-accent hover:bg-gold-vintage text-black font-bold text-xs uppercase tracking-widest py-2.5 px-5 rounded-full transition-colors flex items-center gap-1.5 shadow-lg"
            >
              <FolderPlus size={14} /> New Collection
            </button>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => (
              <motion.div
                key={col.slug}
                layoutId={`col-card-${col.slug}`}
                className="bg-[#180509]/60 backdrop-blur-sm border border-gold-accent/25 rounded-xl overflow-hidden shadow-lg group hover:border-gold-accent/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative bg-black/40">
                    {col.image ? (
                      <img 
                        src={col.image} 
                        alt={col.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=400&auto=format&fit=crop";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-cream-400/30 gap-2">
                        <ImageIcon size={36} />
                        <span className="text-[10px] tracking-widest uppercase">No Image Uploaded</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-black/60 border border-gold-accent/30 rounded px-2 py-0.5 text-[8px] tracking-widest uppercase text-gold-accent font-bold">
                      {col.type || 'Saree'}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-xl text-cream-100 mb-1 group-hover:text-gold-accent transition-colors">{col.title}</h3>
                    <div className="text-[10px] text-gold-vintage/70 uppercase tracking-wider font-semibold mb-3 flex items-center gap-1.5">
                      <span>Origin: {col.origin || 'N/A'}</span>
                    </div>
                    <p className="text-xs text-cream-300/80 font-light leading-relaxed line-clamp-2">{col.description || 'No description provided.'}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-gold-200/5 bg-[#25030A]/20 flex items-center justify-between gap-4">
                  <span className="text-[10px] tracking-wider uppercase font-bold text-cream-400">
                    {col.productCount || 0} Products
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenColModal('edit', col)}
                      className="p-2 border border-gold-accent/20 hover:border-gold-accent/60 rounded text-cream-200 hover:text-gold-accent transition-colors"
                      title="Edit Collection"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteCol(col.slug, col.title)}
                      className="p-2 border border-red-500/20 hover:border-red-500/60 rounded text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Collection"
                    >
                      <Trash2 size={13} />
                    </button>
                    <button
                      onClick={() => setSelectedCollection(col)}
                      className="bg-gold-accent/10 border border-gold-accent/40 text-gold-accent hover:bg-gold-accent hover:text-black font-semibold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded transition-all flex items-center gap-1"
                    >
                      View Items <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {collections.length === 0 && (
              <div className="col-span-full bg-black/20 border border-gold-accent/10 rounded-xl p-12 text-center text-cream-400/50">
                <Package className="mx-auto text-gold-accent/30 mb-3" size={36} />
                <p className="text-sm tracking-wide">No collections created yet.</p>
                <button
                  onClick={() => handleOpenColModal('create')}
                  className="text-gold-accent hover:underline text-xs mt-2"
                >
                  Create one now
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ────────────────────────────────────────────────────────
           PANEL 2: PRODUCTS DETAILED DRILL DOWN
           ──────────────────────────────────────────────────────── */
        <div>
          <button
            onClick={() => setSelectedCollection(null)}
            className="flex items-center gap-1.5 text-xs text-gold-accent hover:text-cream-100 transition-colors mb-6 uppercase tracking-wider font-bold"
          >
            <ArrowLeft size={14} /> Back to collections
          </button>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-5 border-b border-gold-200/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gold-accent/10 border border-gold-accent/30 text-gold-accent text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full">
                  {selectedCollection.type || 'Saree'}
                </span>
                <span className="text-[10px] text-cream-400 tracking-wider">/ {selectedCollection.origin}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-cream-100 tracking-wide font-light">
                {selectedCollection.title} Collection
              </h2>
            </div>

            <button
              onClick={() => handleOpenProdModal('create')}
              className="bg-gold-accent hover:bg-gold-vintage text-black font-bold text-xs uppercase tracking-widest py-2.5 px-5 rounded-full transition-colors flex items-center gap-1.5 shadow-lg shrink-0"
            >
              <Plus size={14} /> Add New {selectedCollection.type || 'Product'}
            </button>
          </div>

          {/* Products List Table / Cards */}
          <div className="bg-[#180509]/40 backdrop-blur-sm border border-gold-accent/20 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gold-accent/20 bg-black/40 text-[10px] uppercase tracking-widest text-gold-accent font-bold">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-4">Material</th>
                    <th className="py-4 px-4">Color</th>
                    <th className="py-4 px-4">Occasion</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-accent/5">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-black/20 transition-colors text-sm">
                      <td className="py-4 px-6 flex items-center gap-4">
                        <div className="w-14 h-16 rounded overflow-hidden bg-black/40 border border-gold-accent/10 flex-shrink-0">
                          {prod.image ? (
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-cream-400/20"><ImageIcon size={18} /></div>
                          )}
                        </div>
                        <div className="max-w-xs sm:max-w-sm">
                          <h4 className="font-semibold text-cream-100 line-clamp-1">{prod.name}</h4>
                          <p className="text-xs text-cream-400/80 font-light mt-0.5 line-clamp-2">{prod.description || 'No description'}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-cream-200 text-xs font-light">{prod.material || '—'}</td>
                      <td className="py-4 px-4 text-cream-200 text-xs font-light">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: prod.color?.toLowerCase() }} />
                          {prod.color || '—'}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-cream-200 text-xs font-light">{prod.occasion || '—'}</td>
                      <td className="py-4 px-4 font-mono font-semibold text-gold-accent">{prod.price}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenProdModal('edit', prod)}
                            className="p-2 border border-gold-accent/20 hover:border-gold-accent/60 rounded text-cream-200 hover:text-gold-accent transition-colors"
                            title="Edit Product"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteProd(prod.id, prod.name)}
                            className="p-2 border border-red-500/20 hover:border-red-500/60 rounded text-red-400 hover:text-red-300 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {products.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-cream-400/50">
                        <Package className="mx-auto text-gold-accent/30 mb-2" size={32} />
                        <p className="text-xs tracking-wide">No items found inside this collection yet.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          COLLECTION MODAL (Create/Edit)
          ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {colModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setColModal({ open: false, mode: 'create', data: null })}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#1D060A] border border-gold-accent/30 rounded-2xl overflow-hidden shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center p-5 border-b border-gold-accent/20 bg-black/20">
                <h3 className="font-serif text-lg text-cream-100 tracking-wide">
                  {colModal.mode === 'create' ? 'Create Collection' : 'Edit Collection'}
                </h3>
                <button 
                  onClick={() => setColModal({ open: false, mode: 'create', data: null })}
                  className="hover:text-gold-accent transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleColSubmit} className="p-6 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Collection Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Kanchipuram Silk"
                      value={colForm.title}
                      onChange={(e) => setColForm(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-black/40 border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent"
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Type *</label>
                    <select
                      value={colForm.type}
                      onChange={(e) => setColForm(prev => ({ ...prev, type: e.target.value }))}
                      className="bg-[#180509] border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent"
                      required
                    >
                      <option value="Saree">Saree</option>
                      <option value="Kurthi">Kurthi</option>
                      <option value="Lehenga">Lehenga</option>
                      <option value="Salwar">Salwar Suite</option>
                      <option value="Dupatta">Dupatta</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Origin / Craft Hub</label>
                    <input
                      type="text"
                      placeholder="e.g. Varanasi, Uttar Pradesh"
                      value={colForm.origin}
                      onChange={(e) => setColForm(prev => ({ ...prev, origin: e.target.value }))}
                      className="bg-black/40 border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Collection Cover URL</label>
                    <div className="flex items-center gap-1 bg-black/40 border border-gold-accent/20 rounded px-2">
                      <LinkIcon size={12} className="text-gold-accent/50" />
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={colForm.image}
                        onChange={(e) => setColForm(prev => ({ ...prev, image: e.target.value }))}
                        className="bg-transparent border-none w-full py-2 text-cream-100 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Upload Section */}
                <div className="border border-dashed border-gold-accent/25 rounded p-4 text-center bg-black/10 flex flex-col items-center justify-center gap-2">
                  <span className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">OR Upload New Image file</span>
                  <label className="flex items-center gap-1.5 px-4 py-2 border border-gold-accent/40 rounded bg-gold-accent/5 text-[10px] font-bold uppercase tracking-wider hover:bg-gold-accent hover:text-black cursor-pointer transition-all">
                    <Upload size={12} />
                    {uploadingImage ? 'Uploading...' : 'Choose File'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileChange(e, 'collection')}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Description / Weave Story</label>
                  <textarea
                    placeholder="Provide a beautifully written heritage description..."
                    value={colForm.description}
                    onChange={(e) => setColForm(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    className="bg-black/40 border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setColModal({ open: false, mode: 'create', data: null })}
                    className="px-4 py-2 border border-gold-accent/20 hover:border-gold-accent/40 rounded text-xs text-cream-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || uploadingImage}
                    className="bg-gold-accent hover:bg-gold-vintage text-black font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded transition-all shadow-md"
                  >
                    {colModal.mode === 'create' ? 'Create' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ────────────────────────────────────────────────────────
          PRODUCT MODAL (Create/Edit)
          ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {prodModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProdModal({ open: false, mode: 'create', data: null })}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#1D060A] border border-gold-accent/30 rounded-2xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b border-gold-accent/20 bg-black/20">
                <h3 className="font-serif text-lg text-cream-100 tracking-wide">
                  {prodModal.mode === 'create' ? `Add ${selectedCollection.type || 'Product'}` : `Edit ${selectedCollection.type || 'Product'}`}
                </h3>
                <button 
                  onClick={() => setProdModal({ open: false, mode: 'create', data: null })}
                  className="hover:text-gold-accent transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleProdSubmit} className="p-6 overflow-y-auto flex flex-col gap-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Product Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Swarnanjali Crimson Katan Saree"
                      value={prodForm.name}
                      onChange={(e) => setProdForm(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-black/40 border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Price *</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹18,500"
                      value={prodForm.price}
                      onChange={(e) => setProdForm(prev => ({ ...prev, price: e.target.value }))}
                      className="bg-black/40 border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Material</label>
                    <input
                      type="text"
                      placeholder="e.g. Mulberry Silk"
                      value={prodForm.material}
                      onChange={(e) => setProdForm(prev => ({ ...prev, material: e.target.value }))}
                      className="bg-black/40 border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Color</label>
                    <input
                      type="text"
                      placeholder="e.g. Deep Crimson"
                      value={prodForm.color}
                      onChange={(e) => setProdForm(prev => ({ ...prev, color: e.target.value }))}
                      className="bg-black/40 border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Occasion</label>
                    <input
                      type="text"
                      placeholder="e.g. Wedding / Bridal"
                      value={prodForm.occasion}
                      onChange={(e) => setProdForm(prev => ({ ...prev, occasion: e.target.value }))}
                      className="bg-black/40 border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Product Image URL</label>
                  <div className="flex items-center gap-1 bg-black/40 border border-gold-accent/20 rounded px-2">
                    <LinkIcon size={12} className="text-gold-accent/50" />
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={prodForm.image}
                      onChange={(e) => setProdForm(prev => ({ ...prev, image: e.target.value }))}
                      className="bg-transparent border-none w-full py-2 text-cream-100 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Upload Image Section */}
                <div className="border border-dashed border-gold-accent/25 rounded p-4 text-center bg-black/10 flex flex-col items-center justify-center gap-2">
                  <span className="text-[9px] uppercase tracking-widest text-gold-accent font-bold">OR Upload Product Photo File</span>
                  <label className="flex items-center gap-1.5 px-4 py-2 border border-gold-accent/40 rounded bg-gold-accent/5 text-[10px] font-bold uppercase tracking-wider hover:bg-gold-accent hover:text-black cursor-pointer transition-all">
                    <Upload size={12} />
                    {uploadingImage ? 'Uploading...' : 'Choose File'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileChange(e, 'product')}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Short Description</label>
                  <textarea
                    placeholder="Short summary highlighting elegance, weave details..."
                    value={prodForm.description}
                    onChange={(e) => setProdForm(prev => ({ ...prev, description: e.target.value }))}
                    rows="2"
                    className="bg-black/40 border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-cream-300 font-bold">Specifications & Extra Details (e.g. Zari type, border size, care, etc.)</label>
                  <textarea
                    placeholder="Zari: Pure 2g Gold Zari | Technique: Handloom Korvai | Border: Wide (9 inches) | Care: Dry Clean"
                    value={prodForm.details}
                    onChange={(e) => setProdForm(prev => ({ ...prev, details: e.target.value }))}
                    rows="2"
                    className="bg-black/40 border border-gold-accent/20 rounded px-3 py-2 text-cream-100 text-xs focus:outline-none focus:border-gold-accent resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gold-accent/10">
                  <button
                    type="button"
                    onClick={() => setProdModal({ open: false, mode: 'create', data: null })}
                    className="px-4 py-2 border border-gold-accent/20 hover:border-gold-accent/40 rounded text-xs text-cream-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || uploadingImage}
                    className="bg-gold-accent hover:bg-gold-vintage text-black font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded transition-all shadow-md"
                  >
                    {prodModal.mode === 'create' ? 'Add Item' : 'Save Details'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
