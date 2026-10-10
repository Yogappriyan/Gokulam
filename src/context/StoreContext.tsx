import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  StitchingJob,
  BannerCampaign,
  Coupon,
  AdminUser,
  Language,
  BlouseMeasurements,
  ColorVariant,
  OrderStatus
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CAMPAIGNS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_STITCHING_JOBS
} from '../data/mockData';

interface StoreContextType {
  products: Product[];
  campaigns: BannerCampaign[];
  coupons: Coupon[];
  orders: Order[];
  stitchingJobs: StitchingJob[];
  cart: CartItem[];
  wishlist: string[];
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  stitchingProduct: Product | null;
  setStitchingProduct: (prod: Product | null) => void;
  currentUser: AdminUser | null;
  activeCategoryFilter: string | null;
  setActiveCategoryFilter: (cat: string | null) => void;
  currentView: 'store' | 'admin' | 'category' | 'product_detail';
  setCurrentView: (view: 'store' | 'admin' | 'category' | 'product_detail') => void;
  selectedDetailProductId: string | null;
  setSelectedDetailProductId: (id: string | null) => void;

  // Cart operations
  addToCart: (
    product: Product,
    selectedColor: ColorVariant,
    selectedSize?: string,
    quantity?: number,
    blouseStitching?: BlouseMeasurements
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;

  // Admin / Store CRUD
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  togglePublish: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateStitchingStatus: (jobId: string, status: StitchingJob['status']) => void;
  updateCampaign: (campaign: BannerCampaign) => void;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void;
  toggleCoupon: (couponId: string) => void;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gokulam_products_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_PRODUCTS.length) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    // Clean old caches and load new authentic catalog
    localStorage.removeItem('gokulam_products');
    localStorage.removeItem('gokulam_products_v2');
    localStorage.setItem('gokulam_products_v3', JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  });

  const [campaigns, setCampaigns] = useState<BannerCampaign[]>(() => {
    const saved = localStorage.getItem('gokulam_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('gokulam_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gokulam_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [stitchingJobs, setStitchingJobs] = useState<StitchingJob[]>(() => {
    const saved = localStorage.getItem('gokulam_stitching');
    return saved ? JSON.parse(saved) : INITIAL_STITCHING_JOBS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('gokulam_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('gokulam_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [language, setLanguage] = useState<Language>('en');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [stitchingProduct, setStitchingProduct] = useState<Product | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'store' | 'admin' | 'category' | 'product_detail'>('store');
  const [selectedDetailProductId, setSelectedDetailProductId] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('gokulam_auth_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-1',
      name: 'S. Ramanathan',
      email: 'admin@gokulam.com',
      role: 'ADMIN'
    };
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('gokulam_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gokulam_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('gokulam_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('gokulam_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gokulam_stitching', JSON.stringify(stitchingJobs));
  }, [stitchingJobs]);

  useEffect(() => {
    localStorage.setItem('gokulam_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gokulam_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  const addToCart = (
    product: Product,
    selectedColor: ColorVariant,
    selectedSize?: string,
    quantity = 1,
    blouseStitching?: BlouseMeasurements
  ) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.productId === product.id &&
          item.selectedColor.name === selectedColor.name &&
          item.selectedSize === selectedSize &&
          !item.blouseStitching &&
          !blouseStitching
      );

      if (existingIndex > -1 && !blouseStitching) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          productId: product.id,
          product,
          selectedColor,
          selectedSize,
          quantity,
          blouseStitching
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const togglePublish = (id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, isPublished: !p.isPublished } : p))
    );
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const orderNumber = `GOK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);

    // If order has blouse stitching, add to stitching jobs pipeline
    orderData.items.forEach(item => {
      if (item.blouseStitching) {
        const newJob: StitchingJob = {
          id: `st-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          orderNumber,
          customerName: orderData.customerName,
          customerPhone: orderData.customerPhone,
          sareeTitle: item.product.name,
          measurements: item.blouseStitching,
          status: 'Received',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          tailorAssigned: 'Woraiyur In-House Tailoring Unit'
        };
        setStitchingJobs(jobs => [newJob, ...jobs]);
      }
    });

    clearCart();
    return newOrder;
  };

  const updateStitchingStatus = (jobId: string, status: StitchingJob['status']) => {
    setStitchingJobs(prev =>
      prev.map(job => (job.id === jobId ? { ...job, status } : job))
    );
  };

  const updateCampaign = (campaign: BannerCampaign) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === campaign.id ? campaign : c))
    );
  };

  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoup: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      usedCount: 0
    };
    setCoupons(prev => [newCoup, ...prev]);
  };

  const toggleCoupon = (id: string) => {
    setCoupons(prev =>
      prev.map(c => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const loginAdmin = (email: string, pass: string) => {
    // Demo admin credentials
    if (email === 'admin@gokulam.com' && pass === 'admin123') {
      const user: AdminUser = {
        id: 'usr-1',
        name: 'S. Ramanathan (Owner)',
        email,
        role: 'ADMIN'
      };
      setCurrentUser(user);
      localStorage.setItem('gokulam_auth_user', JSON.stringify(user));
      return true;
    } else if (email === 'staff@gokulam.com' && pass === 'staff123') {
      const user: AdminUser = {
        id: 'usr-2',
        name: 'V. Sundar (Staff Manager)',
        email,
        role: 'STAFF'
      };
      setCurrentUser(user);
      localStorage.setItem('gokulam_auth_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setCurrentUser(null);
    localStorage.removeItem('gokulam_auth_user');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        campaigns,
        coupons,
        orders,
        stitchingJobs,
        cart,
        wishlist,
        language,
        setLanguage,
        toggleLanguage,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        stitchingProduct,
        setStitchingProduct,
        currentUser,
        activeCategoryFilter,
        setActiveCategoryFilter,
        currentView,
        setCurrentView,
        selectedDetailProductId,
        setSelectedDetailProductId,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        togglePublish,
        updateOrderStatus,
        createOrder,
        updateStitchingStatus,
        updateCampaign,
        addCoupon,
        toggleCoupon,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
