import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Order, OrderStatus } from '../../types';
import {
  Boxes,
  Truck,
  ShoppingBag,
  FileText,
  Users,
  BarChart2,
  Package,
  Settings,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Download,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Scissors,
  Upload,
  ImageIcon
} from 'lucide-react';
import { HERO_IMAGE, FESTIVE_COLLECTION_IMAGE, FURNITURE_LIVING_IMAGE, MACRO_LOOM_IMAGE, UPLOADED_PRODUCT_IMAGES } from '../../data/mockData';

type AdminTab =
  | 'product-catalogue'
  | 'central-stock'
  | 'suppliers'
  | 'orders'
  | 'invoices'
  | 'customers'
  | 'reports'
  | 'profile';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    setCurrentView
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('product-catalogue');
  const [productSearch, setProductSearch] = useState('');
  const [stockCategoryFilter, setStockCategoryFilter] = useState('All Items');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  // Add/Edit Product Form State
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({
    name: '',
    nameTa: '',
    sku: '',
    category: 'Silk & Tissue Sarees',
    categoryTa: 'பட்டு & டிஷ்யூ புடவைகள்',
    subcategory: 'Bridal Kanjivaram',
    fabric: 'Pure Mulberry Silk',
    price: 3499,
    salePrice: 2899,
    stock: 19,
    gstRate: '5%',
    hsn: '5007',
    images: [UPLOADED_PRODUCT_IMAGES[0]],
    colorVariants: [
      { name: 'Royal Crimson', nameTa: 'சிவப்பு', hex: '#800020' },
      { name: 'Antique Gold', nameTa: 'தங்கம்', hex: '#D4AF37' }
    ],
    sizeVariants: [{ name: 'Standard 6.2m', inStock: true, stockCount: 19 }],
    occasion: ['Wedding', 'Festive'],
    isBlouseStitchingAvailable: true,
    isFeatured: true,
    isPublished: true,
    dimensions: '6.2 Meters with Blouse Piece',
    description: 'Woven with heritage pure zari borders.',
    descriptionTa: 'பாரம்பரிய தூய ஜரிகை வேலைப்பாடுகளுடன் கூடிய பட்டு.'
  });

  // Filtered Products for Catalogue Table
  const filteredProducts = products.filter(p => {
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const handleOpenAddModal = () => {
    setEditingProduct({
      name: '',
      nameTa: '',
      sku: `ss-${Math.floor(40 + Math.random() * 20)}`,
      category: 'Silk & Tissue Sarees',
      categoryTa: 'பட்டு & டிஷ்யூ புடவைகள்',
      subcategory: 'Bridal Kanjivaram',
      fabric: 'Pure Mulberry Silk',
      price: 3499,
      salePrice: 2899,
      stock: 15,
      gstRate: '5%',
      hsn: '5007',
      images: [UPLOADED_PRODUCT_IMAGES[0]],
      colorVariants: [
        { name: 'Royal Crimson', nameTa: 'சிவப்பு', hex: '#800020' },
        { name: 'Antique Gold', nameTa: 'தங்கம்', hex: '#D4AF37' }
      ],
      sizeVariants: [{ name: 'Standard 6.2m', inStock: true, stockCount: 15 }],
      occasion: ['Wedding', 'Festive'],
      isBlouseStitchingAvailable: true,
      isFeatured: true,
      isPublished: true,
      dimensions: '6.2 Meters with Blouse Piece',
      description: 'Handcrafted luxury weave with pure zari border.',
      descriptionTa: 'அசல் ஜரிகை வேலைப்பாடு கொண்ட பாரம்பரிய பட்டுப் புடவை.'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct({ ...prod });
    setIsProductModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditingProduct(prev => ({
          ...prev,
          images: [result, ...(prev.images?.slice(1) || [])]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct.id) {
      updateProduct(editingProduct as Product);
    } else {
      addProduct({
        ...editingProduct,
        images: editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : [UPLOADED_PRODUCT_IMAGES[0]]
      } as Omit<Product, 'id'>);
    }
    setIsProductModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F7] text-[#1C1917] pt-20 flex">
      {/* LEFT SIDEBAR (EXACT MATCH TO ATTACHED SCREENSHOTS) */}
      <aside className="w-64 bg-white border-r border-[#E5E7EB] shrink-0 min-h-[calc(100vh-5rem)] p-4 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Note: NO Retail POS Terminal per user instruction "Dont add retail POSTerminal" */}

          {/* 1. Unified Central Stock */}
          <button
            onClick={() => setActiveTab('central-stock')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
              activeTab === 'central-stock'
                ? 'bg-[#8C6D46] text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Boxes className="w-4 h-4 shrink-0" />
            <span>Unified Central Stock</span>
          </button>

          {/* 2. Suppliers & Purchases */}
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
              activeTab === 'suppliers'
                ? 'bg-[#8C6D46] text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Truck className="w-4 h-4 shrink-0" />
            <span>Suppliers & Purchases</span>
          </button>

          {/* 3. Orders & Fulfillment */}
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
              activeTab === 'orders'
                ? 'bg-[#8C6D46] text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Orders & Fulfillment</span>
          </button>

          {/* 4. GST Invoices Archive */}
          <button
            onClick={() => setActiveTab('invoices')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
              activeTab === 'invoices'
                ? 'bg-[#8C6D46] text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>GST Invoices Archive</span>
          </button>

          {/* 5. Customers & Loyalty */}
          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
              activeTab === 'customers'
                ? 'bg-[#8C6D46] text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Customers & Loyalty</span>
          </button>

          {/* 6. GST & Sales Reports */}
          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
              activeTab === 'reports'
                ? 'bg-[#8C6D46] text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <BarChart2 className="w-4 h-4 shrink-0" />
            <span>GST & Sales Reports</span>
          </button>

          {/* 7. Product Catalogue (As in Image 2) */}
          <button
            onClick={() => setActiveTab('product-catalogue')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
              activeTab === 'product-catalogue'
                ? 'bg-[#8C6D46] text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>Product Catalogue</span>
          </button>

          {/* 8. Store & GST Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
              activeTab === 'profile'
                ? 'bg-[#8C6D46] text-white shadow-sm'
                : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Store & GST Profile</span>
          </button>
        </div>

        {/* Bottom Store Info */}
        <div className="pt-4 border-t border-stone-200 text-xs text-stone-500">
          <p className="font-serif font-bold text-stone-800">Gokulam Textile & Furniture</p>
          <p>65a, Nawab Thottam Main Road, Woraiyur, Trichy - 620003</p>
          <button
            onClick={() => setCurrentView('store')}
            className="text-[#8C6D46] hover:underline font-semibold mt-2 block"
          >
            ← Back to Storefront
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* ========================================================
            TAB: PRODUCT CATALOGUE (EXACT MATCH TO IMAGE 2)
            ======================================================== */}
        {activeTab === 'product-catalogue' && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header: Title + Subtitle + "+ ADD NEW PRODUCT" Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-semibold text-[#1C1917] tracking-tight">
                  Product Catalogue
                </h1>
                <p className="text-sm text-[#78716C] mt-1">
                  Add new products, set GST rates, SKUs, and stock limits.
                </p>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW PRODUCT</span>
              </button>
            </div>

            {/* Product Table Card */}
            <div className="bg-white rounded-xl border border-[#E7E5E4] shadow-sm overflow-hidden">
              {/* Search Header inside the card */}
              <div className="p-4 border-b border-[#E7E5E4] flex items-center gap-3">
                <Search className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E7E5E4] text-[11px] font-bold text-[#78716C] uppercase tracking-wider bg-[#FAFAF9]">
                      <th className="py-3 px-6">PRODUCT</th>
                      <th className="py-3 px-6">SKU / BARCODE</th>
                      <th className="py-3 px-6">CATEGORY</th>
                      <th className="py-3 px-6">PRICE</th>
                      <th className="py-3 px-6">GST RATE</th>
                      <th className="py-3 px-6">LIVE STOCK</th>
                      <th className="py-3 px-6 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E5E4] text-sm">
                    {filteredProducts.map(prod => (
                      <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                        {/* PRODUCT */}
                        <td className="py-3.5 px-6 flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 object-cover rounded-md border border-stone-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-semibold text-stone-900 text-sm line-clamp-1">
                            {prod.name}
                          </span>
                        </td>

                        {/* SKU / BARCODE */}
                        <td className="py-3.5 px-6 font-mono text-xs text-stone-600">
                          {prod.sku}
                        </td>

                        {/* CATEGORY */}
                        <td className="py-3.5 px-6 uppercase text-xs font-medium text-stone-700 tracking-wider">
                          {prod.category}
                        </td>

                        {/* PRICE */}
                        <td className="py-3.5 px-6 font-bold text-stone-900 tabular-nums">
                          ₹{(prod.salePrice || prod.price).toLocaleString('en-IN')}
                        </td>

                        {/* GST RATE */}
                        <td className="py-3.5 px-6 text-stone-700 text-xs">
                          {prod.gstRate || '5%'}
                        </td>

                        {/* LIVE STOCK */}
                        <td className="py-3.5 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                            {prod.stock} IN STOCK
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td className="py-3.5 px-6 text-right">
                          <div className="flex items-center justify-end gap-3 text-stone-400">
                            <button
                              onClick={() => handleOpenEditModal(prod)}
                              className="hover:text-stone-800 transition-colors p-1"
                              title="Edit product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="hover:text-red-600 transition-colors p-1"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="py-12 text-center text-sm text-stone-500">
                  No products found matching "{productSearch}".
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: UNIFIED CENTRAL STOCK
            ======================================================== */}
        {activeTab === 'central-stock' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">
                  Unified Central Stock
                </h1>
                <p className="text-sm text-[#78716C] mt-1">
                  Woraiyur central warehouse & showroom live inventory tracking.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500">Total Live SKUs:</span>
                <span className="font-bold text-stone-900 bg-white border border-stone-300 px-3 py-1 rounded-lg text-sm">
                  {products.length} Items
                </span>
              </div>
            </div>

            {/* Quick SKU Search & Category Filter Pills */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg">
                  <Search className="w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search Unique SKU ID (e.g. ss-50, GOK-SILK-001), Barcode..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    className="w-full text-xs text-stone-900 bg-transparent focus:outline-none"
                  />
                </div>
                <button className="px-5 py-2 bg-[#1C1917] text-white text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-2">
                  <span>SKU / BARCODE ADD</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
                {[
                  'All Items',
                  'Silk & Tissue Sarees',
                  'Cotton & Daily Sarees',
                  'Chudidars & Designer Wear',
                  'Furniture',
                  'Pooja & Festive Home'
                ].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setStockCategoryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      stockCategoryFilter === cat
                        ? 'bg-[#1C1917] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Stock Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products
                .filter(
                  p =>
                    (stockCategoryFilter === 'All Items' || p.category === stockCategoryFilter) &&
                    (p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.sku.toLowerCase().includes(productSearch.toLowerCase()))
                )
                .map(prod => (
                  <div
                    key={prod.id}
                    className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-stone-100 text-stone-600 rounded">
                        {prod.sku}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        Stock: {prod.stock}
                      </span>
                    </div>

                    <div className="h-28 rounded-lg overflow-hidden border border-stone-100 relative">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-stone-900 line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-stone-500">HSN: {prod.hsn || '5007'}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                      <span className="font-bold text-stone-900">
                        ₹{(prod.salePrice || prod.price).toLocaleString('en-IN')}
                      </span>
                      <span className="text-stone-500">GST {prod.gstRate || '5%'}</span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() =>
                          updateProduct({ ...prod, stock: Math.max(0, prod.stock - 1) })
                        }
                        className="flex-1 py-1 text-xs border border-stone-300 rounded hover:bg-stone-50"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => updateProduct({ ...prod, stock: prod.stock + 1 })}
                        className="flex-1 py-1 text-xs border border-stone-300 rounded hover:bg-stone-50"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => updateProduct({ ...prod, stock: prod.stock + 5 })}
                        className="flex-1 py-1 text-xs bg-[#8C6D46] text-white font-semibold rounded hover:bg-[#7A5B35]"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: ORDERS & FULFILLMENT
            ======================================================== */}
        {activeTab === 'orders' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">
                  Orders & Fulfillment
                </h1>
                <p className="text-sm text-[#78716C] mt-1">
                  Manage store pickups, home deliveries, and tailor stitching notes.
                </p>
              </div>

              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full font-semibold">
                {orders.length} Active Orders
              </span>
            </div>

            <div className="space-y-4">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div>
                      <span className="font-mono text-sm font-bold text-stone-900">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs text-stone-500 ml-3">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-500">Status:</span>
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="text-xs font-semibold bg-stone-100 border border-stone-300 rounded px-3 py-1.5 focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Stitching">Stitching / Preparing</option>
                        <option value="Ready">Ready for Pickup / Dispatch</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => setSelectedInvoice(order)}
                        className="text-xs text-[#8C6D46] hover:underline font-semibold ml-2"
                      >
                        View GST Bill
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-stone-400 font-semibold block uppercase">Customer</span>
                      <span className="text-stone-900 font-bold block mt-0.5">
                        {order.customerName}
                      </span>
                      <span className="text-stone-600 block">{order.customerPhone}</span>
                    </div>

                    <div>
                      <span className="text-stone-400 font-semibold block uppercase">Fulfillment</span>
                      <span className="text-stone-900 font-semibold block mt-0.5 capitalize">
                        {order.deliveryType === 'pickup'
                          ? 'Woraiyur Showroom Pickup'
                          : `Home Delivery (${order.pincode})`}
                      </span>
                      <span className="text-stone-600 block">{order.customerAddress}</span>
                    </div>

                    <div>
                      <span className="text-stone-400 font-semibold block uppercase">Total Amount</span>
                      <span className="font-mono text-base font-bold text-stone-900 block mt-0.5">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                      <span className="text-emerald-700 block text-[11px]">Paid / COD Verified</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs p-2.5 bg-stone-50 rounded-lg"
                      >
                        <div>
                          <span className="font-semibold text-stone-900">{item.product.name}</span>
                          <span className="text-stone-500 ml-2">
                            (Color: {item.selectedColor.name}, Qty: {item.quantity})
                          </span>
                          {item.blouseStitching && (
                            <span className="text-[11px] text-[#8C6D46] font-medium block mt-0.5 flex items-center gap-1">
                              <Scissors className="w-3 h-3" /> Custom Stitching: Bust{' '}
                              {item.blouseStitching.bust}", Sleeve {item.blouseStitching.sleeveLength}"
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-stone-900 font-mono">
                          ₹
                          {(
                            (item.product.salePrice || item.product.price) * item.quantity
                          ).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: GST INVOICES ARCHIVE
            ======================================================== */}
        {activeTab === 'invoices' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">
                  GST Invoices Archive
                </h1>
                <p className="text-sm text-[#78716C] mt-1">
                  Tax invoices with HSN, CGST (2.5%), SGST (2.5%), and IGST compliance.
                </p>
              </div>

              <button className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                <Download className="w-4 h-4" />
                <span>Export GSTR-1 CSV</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider bg-stone-50">
                    <th className="py-3 px-6">INVOICE NO</th>
                    <th className="py-3 px-6">DATE</th>
                    <th className="py-3 px-6">CUSTOMER</th>
                    <th className="py-3 px-6">TAXABLE VALUE</th>
                    <th className="py-3 px-6">CGST (2.5%)</th>
                    <th className="py-3 px-6">SGST (2.5%)</th>
                    <th className="py-3 px-6">TOTAL</th>
                    <th className="py-3 px-6 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map(ord => {
                    const taxable = Math.round(ord.total / 1.05);
                    const cgst = Math.round((ord.total - taxable) / 2);
                    const sgst = cgst;

                    return (
                      <tr key={ord.id} className="hover:bg-stone-50">
                        <td className="py-3.5 px-6 font-mono font-bold text-stone-900">
                          INV-{ord.orderNumber.replace('GOK-', '')}
                        </td>
                        <td className="py-3.5 px-6 text-stone-600">
                          {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3.5 px-6 font-semibold text-stone-900">
                          {ord.customerName}
                        </td>
                        <td className="py-3.5 px-6 font-mono tabular-nums">
                          ₹{taxable.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-6 font-mono tabular-nums text-stone-600">
                          ₹{cgst.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-6 font-mono tabular-nums text-stone-600">
                          ₹{sgst.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-6 font-mono font-bold text-stone-900">
                          ₹{ord.total.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <button
                            onClick={() => setSelectedInvoice(ord)}
                            className="text-[#8C6D46] hover:underline font-semibold"
                          >
                            View Invoice
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: SUPPLIERS & PURCHASES
            ======================================================== */}
        {activeTab === 'suppliers' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">
              Suppliers & Purchases
            </h1>
            <p className="text-sm text-[#78716C]">
              Direct handloom weavers, silk societies, and timber yards supply network.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-3">
                <span className="text-xs font-bold text-[#8C6D46] uppercase tracking-wider block">
                  Master Silk Guild
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Kanchipuram Silk Weavers Society
                </h3>
                <p className="text-xs text-stone-600">
                  GSTIN: 33AAATK1234F1Z8 · Sourcing: Pure mulberry silk with tested gold zari.
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Active POs: 4</span>
                  <span className="text-emerald-700 font-semibold">Verified Supplier</span>
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-3">
                <span className="text-xs font-bold text-[#8C6D46] uppercase tracking-wider block">
                  Cotton Handlooms
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Chettinad & Salem Handloom Guild
                </h3>
                <p className="text-xs text-stone-600">
                  GSTIN: 33AAACS5678G2Z1 · Sourcing: 100% combed cotton sarees and lungis.
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Active POs: 2</span>
                  <span className="text-emerald-700 font-semibold">Verified Supplier</span>
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-3">
                <span className="text-xs font-bold text-[#8C6D46] uppercase tracking-wider block">
                  Fine Timber
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Nilambur Teak & Rosewood Unit
                </h3>
                <p className="text-xs text-stone-600">
                  GSTIN: 32AABNT9012H3Z5 · Sourcing: Seasoned solid wood cots and pooja mandapams.
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Active POs: 1</span>
                  <span className="text-emerald-700 font-semibold">Verified Supplier</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: CUSTOMERS & LOYALTY
            ======================================================== */}
        {activeTab === 'customers' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">
              Customers & Loyalty
            </h1>
            <p className="text-sm text-[#78716C]">
              Woraiyur store families, bridal orders, and saved tailoring measurements.
            </p>

            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider bg-stone-50">
                    <th className="py-3 px-6">CUSTOMER NAME</th>
                    <th className="py-3 px-6">MOBILE</th>
                    <th className="py-3 px-6">LOCATION</th>
                    <th className="py-3 px-6">TOTAL ORDERS</th>
                    <th className="py-3 px-6">LIFETIME SPEND</th>
                    <th className="py-3 px-6">LOYALTY TIER</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr className="hover:bg-stone-50">
                    <td className="py-3.5 px-6 font-semibold text-stone-900">
                      Meenakshi Sundaram
                    </td>
                    <td className="py-3.5 px-6 font-mono text-stone-600">+91 94431 82741</td>
                    <td className="py-3.5 px-6 text-stone-600">Salai Road, Woraiyur</td>
                    <td className="py-3.5 px-6 font-bold text-stone-900">3 Orders</td>
                    <td className="py-3.5 px-6 font-mono font-bold text-stone-900">₹42,800</td>
                    <td className="py-3.5 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        Gold Member
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="py-3.5 px-6 font-semibold text-stone-900">Karthik Raja</td>
                    <td className="py-3.5 px-6 font-mono text-stone-600">+91 98424 15902</td>
                    <td className="py-3.5 px-6 text-stone-600">Nachiar Koil St, Woraiyur</td>
                    <td className="py-3.5 px-6 font-bold text-stone-900">1 Order</td>
                    <td className="py-3.5 px-6 font-mono font-bold text-stone-900">₹40,000</td>
                    <td className="py-3.5 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-800">
                        Silver Member
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: GST & SALES REPORTS
            ======================================================== */}
        {activeTab === 'reports' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">
              GST & Sales Reports
            </h1>
            <p className="text-sm text-[#78716C]">
              Comprehensive tax filing and revenue summaries for Tiruchirappalli jurisdiction.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <span className="text-xs text-stone-500 uppercase font-semibold">Total Gross Turnover</span>
                <div className="font-mono text-2xl font-bold text-stone-900 mt-1">
                  ₹{orders.reduce((a, b) => a + b.total, 0).toLocaleString('en-IN')}
                </div>
                <span className="text-xs text-emerald-600 mt-2 block font-medium">
                  +24% increase during Deepavali
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <span className="text-xs text-stone-500 uppercase font-semibold">Total GST Output Liability</span>
                <div className="font-mono text-2xl font-bold text-[#8C6D46] mt-1">
                  ₹{Math.round(orders.reduce((a, b) => a + b.total, 0) * 0.05).toLocaleString('en-IN')}
                </div>
                <span className="text-xs text-stone-500 mt-2 block">
                  CGST: 50% · SGST: 50%
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <span className="text-xs text-stone-500 uppercase font-semibold">Primary Category Share</span>
                <div className="font-serif text-xl font-bold text-stone-900 mt-1">
                  Silk Sarees (62%)
                </div>
                <span className="text-xs text-stone-500 mt-2 block">
                  Furniture (28%) · Cottons (10%)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: STORE & GST PROFILE
            ======================================================== */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">
              Store & GST Profile
            </h1>
            <p className="text-sm text-[#78716C]">
              Tax Registration, Trade Name, and Showroom Details.
            </p>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-stone-500 uppercase font-bold block">Legal Trade Name</span>
                  <span className="font-bold text-stone-900 text-base">Gokulam Furniture & Textile</span>
                </div>
                <div>
                  <span className="text-xs text-stone-500 uppercase font-bold block">GSTIN</span>
                  <span className="font-mono font-bold text-[#8C6D46] text-base">33AAAAA0000A1Z5</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-stone-100">
                <div>
                  <span className="text-xs text-stone-500 uppercase font-bold block">Jurisdiction</span>
                  <span className="text-stone-800">Woraiyur Circle, Tiruchirappalli (Trichy) - 620003</span>
                </div>
                <div>
                  <span className="text-xs text-stone-500 uppercase font-bold block">State Code</span>
                  <span className="font-mono text-stone-800">33 (Tamil Nadu)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <span className="text-xs text-stone-500 uppercase font-bold block mb-1">Registered HSN Codes</span>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-stone-100 rounded text-xs font-mono">
                    5007 (Silk Sarees - 5%)
                  </span>
                  <span className="px-2.5 py-1 bg-stone-100 rounded text-xs font-mono">
                    6204 (Women Garments - 5%)
                  </span>
                  <span className="px-2.5 py-1 bg-stone-100 rounded text-xs font-mono">
                    9403 (Teak Furniture - 12%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          ADD / EDIT PRODUCT MODAL (MATCHING SCREENSHOT)
          ======================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-5">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {editingProduct.id ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              {/* Product Name (English & Tamil) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    PRODUCT NAME (ENGLISH) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="e.g. Royal Blue Silk Kurti Set"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    PRODUCT NAME (TAMIL)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.nameTa || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, nameTa: e.target.value })}
                    placeholder="e.g. பட்டு சுடிதார் செட்"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              {/* SKU Box with Helper (as in screenshot) */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  SKU / UNIQUE IDENTIFIER *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.sku || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                  placeholder="SS-50"
                  className="w-full px-4 py-3 bg-white border border-[#FDBA74] rounded-xl text-stone-900 font-mono font-bold text-base focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
                <p className="text-[11px] text-stone-500">
                  Unique identifier used by cashiers to instantly search and scan items in POS Billing.
                </p>
              </div>

              {/* Category & Barcode / EAN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    CATEGORY *
                  </label>
                  <select
                    value={editingProduct.category || '3 piece sets'}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-stone-800"
                  >
                    <option value="3 piece sets">3 piece sets</option>
                    <option value="Silk & Tissue Sarees">Silk & Tissue Sarees</option>
                    <option value="Cotton & Daily Sarees">Cotton & Daily Sarees</option>
                    <option value="Chudidars & Designer Wear">Chudidars & Designer Wear</option>
                    <option value="Kids & Family Ethnic Wear">Kids & Family Ethnic Wear</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Pooja & Festive Home">Pooja & Festive Home</option>
                    <option value="Home Furnishings">Home Furnishings</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    BARCODE / EAN
                  </label>
                  <input
                    type="text"
                    placeholder="e.g.  8901234567890"
                    value={editingProduct.dimensions || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Selling Price & Discount Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    SELLING PRICE (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={e =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseInt(e.target.value, 10) || 0
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 font-mono text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    DISCOUNT PRICE (OPTIONAL)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.salePrice || ''}
                    onChange={e =>
                      setEditingProduct({
                        ...editingProduct,
                        salePrice: e.target.value ? parseInt(e.target.value, 10) : undefined
                      })
                    }
                    placeholder="3499"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Unified Initial Stock & GST Percent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    UNIFIED INITIAL STOCK *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock || 0}
                    onChange={e =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: parseInt(e.target.value, 10) || 0
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 font-mono text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    GST PERCENT (%)
                  </label>
                  <select
                    value={editingProduct.gstRate || '5%'}
                    onChange={e => setEditingProduct({ ...editingProduct, gstRate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none"
                  >
                    <option value="5%">5% GST (Apparel)</option>
                    <option value="12%">12% GST (Furniture & Décor)</option>
                    <option value="18%">18% GST (Accessories & Services)</option>
                    <option value="0%">0% GST (Exempt)</option>
                  </select>
                </div>
              </div>

              {/* HSN Code */}
              <div>
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  HSN CODE
                </label>
                <input
                  type="text"
                  value={editingProduct.hsn || '6204'}
                  onChange={e => setEditingProduct({ ...editingProduct, hsn: e.target.value })}
                  placeholder="6204"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 font-mono text-sm focus:outline-none"
                />
              </div>

              {/* Available Sizes (Comma Separated) */}
              <div>
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  AVAILABLE SIZES (COMMA SEPARATED)
                </label>
                <input
                  type="text"
                  value={
                    editingProduct.sizeVariants && editingProduct.sizeVariants.length > 0
                      ? editingProduct.sizeVariants.map(s => s.name).join(', ')
                      : 'S, M, L, xl'
                  }
                  onChange={e => {
                    const val = e.target.value;
                    const splitSizes = val.split(',').map(s => s.trim()).filter(Boolean);
                    setEditingProduct({
                      ...editingProduct,
                      sizeVariants: splitSizes.map(name => ({
                        name,
                        inStock: true,
                        stockCount: editingProduct.stock || 10
                      }))
                    });
                  }}
                  placeholder="S, M, L, xl"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none"
                />
              </div>

              {/* Image URL & Upload from Device */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                    IMAGE URL
                  </label>
                  {/* Upload from Device Button */}
                  <label className="text-xs font-semibold text-[#8C6D46] hover:text-[#7A5B35] cursor-pointer flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100/90 px-3 py-1.5 rounded-lg border border-amber-300 transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Direct URL Input */}
                <input
                  type="text"
                  value={editingProduct.images?.[0] || ''}
                  onChange={e =>
                    setEditingProduct({
                      ...editingProduct,
                      images: [e.target.value, ...(editingProduct.images?.slice(1) || [])]
                    })
                  }
                  placeholder="https://i.postimg.cc/zBSN9CLw/Chat-GPT-Image-May-6-2026-09-09-13-PM.png"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-stone-800"
                />

                {/* Upload from Device Drop Zone */}
                <label className="border-2 border-dashed border-stone-300 hover:border-[#8C6D46] bg-stone-50 hover:bg-amber-50/40 rounded-xl p-3 flex flex-col items-center justify-center gap-1 text-center cursor-pointer transition-colors group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 group-hover:text-[#8C6D46]">
                    <ImageIcon className="w-4 h-4 text-stone-500 group-hover:text-[#8C6D46]" />
                    <span>Click to browse or drop an image file from your device</span>
                  </div>
                  <span className="text-[10px] text-stone-400">Supports JPG, PNG, WebP up to 10MB</span>
                </label>

                {/* Sample Presets Quick Links */}
                <div className="flex items-center gap-2 pt-1 overflow-x-auto text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-400 shrink-0">Sample Images:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingProduct({
                        ...editingProduct,
                        images: [UPLOADED_PRODUCT_IMAGES[0], ...(editingProduct.images?.slice(1) || [])]
                      })
                    }
                    className="underline hover:text-[#8C6D46] whitespace-nowrap cursor-pointer"
                  >
                    Crimson Silk Saree
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingProduct({
                        ...editingProduct,
                        images: [FESTIVE_COLLECTION_IMAGE, ...(editingProduct.images?.slice(1) || [])]
                      })
                    }
                    className="underline hover:text-[#8C6D46] whitespace-nowrap cursor-pointer"
                  >
                    Tissue Silk Edit
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingProduct({
                        ...editingProduct,
                        images: [FURNITURE_LIVING_IMAGE, ...(editingProduct.images?.slice(1) || [])]
                      })
                    }
                    className="underline hover:text-[#8C6D46] whitespace-nowrap cursor-pointer"
                  >
                    Teakwood Furniture
                  </button>
                </div>

                {/* Live Preview Container if image selected */}
                {editingProduct.images?.[0] && (
                  <div className="mt-2 flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <img
                      src={editingProduct.images[0]}
                      alt="Preview"
                      className="w-14 h-14 object-cover rounded-lg border border-stone-200 shadow-sm shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-800 truncate">
                          Image Preview Ready
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 block truncate font-mono mt-0.5">
                        {editingProduct.images[0].startsWith('data:')
                          ? 'Uploaded from Local Device (Base64)'
                          : editingProduct.images[0]}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProduct({
                          ...editingProduct,
                          images: []
                        })
                      }
                      className="text-stone-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-stone-100 cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* SAVE PRODUCT CHANGES BUTTON (MATCHING SCREENSHOT) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1C1917] hover:bg-[#292524] text-white font-bold text-sm tracking-wider uppercase rounded-xl transition-colors shadow-md cursor-pointer"
                >
                  SAVE PRODUCT CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW GST INVOICE MODAL
          ======================================================== */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white border border-stone-300 rounded-xl p-8 shadow-2xl my-8 space-y-6">
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  TAX INVOICE
                </h3>
                <p className="text-xs text-stone-500">Gokulam Furniture & Textile</p>
                <p className="text-xs text-stone-500">GSTIN: 33AAAAA0000A1Z5 · 65a, Nawab Thottam Main Road, Woraiyur, Trichy 620003</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block uppercase font-semibold">Billed To</span>
                <span className="font-bold text-stone-900 block mt-0.5">
                  {selectedInvoice.customerName}
                </span>
                <span className="text-stone-600 block">{selectedInvoice.customerPhone}</span>
                <span className="text-stone-600 block">{selectedInvoice.customerAddress}</span>
              </div>
              <div className="text-right">
                <span className="text-stone-400 block uppercase font-semibold">Invoice Details</span>
                <span className="font-mono font-bold text-stone-900 block mt-0.5">
                  INV-{selectedInvoice.orderNumber.replace('GOK-', '')}
                </span>
                <span className="text-stone-600 block">
                  Date: {new Date(selectedInvoice.createdAt).toLocaleDateString('en-IN')}
                </span>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-stone-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5">Qty</th>
                    <th className="p-2.5">Rate</th>
                    <th className="p-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {selectedInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-semibold text-stone-900">{item.product.name}</td>
                      <td className="p-2.5">{item.quantity}</td>
                      <td className="p-2.5 font-mono">
                        ₹{(item.product.salePrice || item.product.price).toLocaleString('en-IN')}
                      </td>
                      <td className="p-2.5 text-right font-mono font-bold">
                        ₹
                        {(
                          (item.product.salePrice || item.product.price) * item.quantity
                        ).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs border-t border-stone-200 pt-3">
              <div className="flex justify-between text-stone-600">
                <span>Taxable Value:</span>
                <span className="font-mono">
                  ₹{Math.round(selectedInvoice.total / 1.05).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>CGST (2.5%):</span>
                <span className="font-mono">
                  ₹{Math.round((selectedInvoice.total - selectedInvoice.total / 1.05) / 2).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>SGST (2.5%):</span>
                <span className="font-mono">
                  ₹{Math.round((selectedInvoice.total - selectedInvoice.total / 1.05) / 2).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Invoice Total:</span>
                <span className="font-mono">
                  ₹{selectedInvoice.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  alert('Tax Invoice downloaded to your system.');
                  setSelectedInvoice(null);
                }}
                className="px-5 py-2 bg-[#8C6D46] hover:bg-[#7A5B35] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Print / Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
