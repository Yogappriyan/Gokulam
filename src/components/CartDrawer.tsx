import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ShoppingBag, MapPin, Truck, Check, Scissors, Tag, ArrowRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    coupons,
    createOrder,
    language
  } = useStore();

  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');

  // Customer Checkout Form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmedNumber, setOrderConfirmedNumber] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.salePrice || item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    const found = coupons.find(c => c.code === code && c.isActive);

    if (!found) {
      setCouponError('Invalid or expired coupon code');
      return;
    }

    if (subtotal < found.minOrder) {
      setCouponError(`Minimum order of ₹${found.minOrder.toLocaleString('en-IN')} required for this coupon`);
      return;
    }

    let discount = 0;
    if (found.discountPercent) {
      discount = Math.round((subtotal * found.discountPercent) / 100);
    } else if (found.flatDiscount) {
      discount = found.flatDiscount;
    }

    setDiscountAmount(discount);
    setAppliedCoupon(code);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeStatus('invalid');
      return;
    }
    setPincodeStatus('checking');
    setTimeout(() => {
      // Trichy & Tamil Nadu pincodes: 620xxx, 621xxx, etc.
      if (pincode.startsWith('62') || pincode.startsWith('60') || pincode.startsWith('63') || pincode.startsWith('64')) {
        setPincodeStatus('valid');
      } else {
        setPincodeStatus('valid'); // Standard delivery across India
      }
    }, 600);
  };

  const handleConfirmOrder = (orderMode: 'standard' | 'whatsapp') => {
    if (!customerName || !customerPhone) {
      alert('Please enter your name and phone number to complete the order.');
      return;
    }

    const newOrder = createOrder({
      customerName,
      customerPhone,
      customerAddress: deliveryType === 'delivery' ? customerAddress : 'Store Pickup at Woraiyur Showroom',
      pincode: deliveryType === 'delivery' ? pincode : '620003',
      deliveryType,
      items: cart,
      subtotal,
      discount: discountAmount,
      total: finalTotal,
      status: 'Confirmed',
      whatsappSent: orderMode === 'whatsapp'
    });

    setOrderConfirmedNumber(newOrder.orderNumber);
    confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });

    if (orderMode === 'whatsapp') {
      const itemsText = cart
        .map(
          i =>
            `• ${i.product.name} (Color: ${i.selectedColor.name}, Qty: ${i.quantity}${
              i.blouseStitching ? ' + Custom Blouse Stitching' : ''
            })`
        )
        .join('\n');

      const msg = `*New Order from Gokulam Store Website*\nOrder ID: ${newOrder.orderNumber}\nCustomer: ${customerName}\nPhone: ${customerPhone}\nDelivery: ${
        deliveryType === 'pickup' ? 'Store Pickup (Woraiyur)' : `Home Delivery (${pincode})`
      }\n\n*Items:*\n${itemsText}\n\n*Total:* ₹${finalTotal.toLocaleString('en-IN')}`;

      window.open(`https://wa.me/919443182741?text=${encodeURIComponent(msg)}`, '_blank');
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="w-screen max-w-md bg-[#140609] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between"
        >
          {/* Drawer Header */}
          <div className="p-6 bg-[#1A070C] border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-serif text-lg font-bold text-[#FAF6EE]">
                {language === 'en' ? 'Shopping Bag' : 'உங்கள் கூடை'}
              </h2>
              <span className="text-xs text-[#D4AF37] font-mono">
                ({cart.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckingOut(false);
                setOrderConfirmedNumber(null);
              }}
              className="p-1.5 text-[#FAF6EE]/60 hover:text-[#FAF6EE] rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderConfirmedNumber ? (
              /* Order Confirmation Success State */
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1F4529] border-2 border-emerald-400 text-white flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#FAF6EE]">
                  Order Confirmed!
                </h3>
                <p className="text-xs text-[#D4AF37] font-mono">
                  Order ID: {orderConfirmedNumber}
                </p>
                <p className="text-xs text-[#FAF6EE]/80 leading-relaxed max-w-xs mx-auto">
                  Thank you! Our Woraiyur team has received your order. If you ordered custom blouse stitching, our master tailor will reach out to verify measurements.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setOrderConfirmedNumber(null);
                    setIsCheckingOut(false);
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#B8860B] text-[#140609] font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Bag State */
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#D4AF37]/40 mx-auto" />
                <p className="font-serif text-lg text-[#FAF6EE]">Your bag is currently empty</p>
                <p className="text-xs text-[#FAF6EE]/60">
                  Explore our pure Kanjivaram silk sarees, daily garments, and teak furniture.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2 border border-[#D4AF37]/50 text-xs text-[#F3E5AB] rounded hover:bg-[#D4AF37]/10"
                >
                  Start Shopping
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Customer Details & Pincode Screen */
              <div className="space-y-4">
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 mb-2"
                >
                  ← Back to Bag Items
                </button>

                <h3 className="font-serif text-lg font-bold text-[#FAF6EE]">
                  Checkout & Fulfillment
                </h3>

                {/* Delivery Mode Selector */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#20080E] rounded border border-[#D4AF37]/20">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`py-2 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-[#B8860B] text-[#140609] shadow-sm'
                        : 'text-[#FAF6EE]/70'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Store Pickup (Woraiyur)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`py-2 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-[#B8860B] text-[#140609] shadow-sm'
                        : 'text-[#FAF6EE]/70'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Home Delivery</span>
                  </button>
                </div>

                {deliveryType === 'pickup' ? (
                  <div className="p-3 bg-[#1C080E] rounded border border-[#D4AF37]/20 text-xs text-[#FAF6EE]/80 space-y-1">
                    <span className="font-bold text-[#D4AF37] block">Woraiyur Storefront Pickup</span>
                    <p className="text-[11px] text-[#FAF6EE]/90">
                      Collect at: 65a, Nawab Thottam Main Road, Woraiyur, Tiruchirappalli, Tamil Nadu 620003.
                    </p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=38%2C+Nawab+Thottam+Main+Rd%2C+Woraiyur%2C+Tiruchirappalli%2C+Tamil+Nadu+620003"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-[#D4AF37] hover:underline font-mono inline-block font-semibold"
                    >
                      Maps Directions: 38, Nawab Thottam Main Rd →
                    </a>
                  </div>
                ) : (
                  /* Pincode & Address Verification */
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-[#FAF6EE]/70 mb-1">
                        Delivery Pincode
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          value={pincode}
                          onChange={e => {
                            setPincode(e.target.value);
                            setPincodeStatus('idle');
                          }}
                          placeholder="e.g. 620003"
                          className="flex-1 px-3 py-1.5 bg-[#20080E] border border-[#D4AF37]/30 rounded text-xs text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                        />
                        <button
                          onClick={handlePincodeCheck}
                          className="px-3 py-1.5 bg-[#2A0910] text-xs text-[#F3E5AB] border border-[#D4AF37]/40 rounded hover:bg-[#380E17]"
                        >
                          Check
                        </button>
                      </div>
                      {pincodeStatus === 'valid' && (
                        <span className="text-[10px] text-emerald-400 mt-1 block flex items-center gap-1">
                          <Check className="w-3 h-3" /> Available for Safe Delivery in 2–3 Days!
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#FAF6EE]/70 mb-1">
                        Delivery Address
                      </label>
                      <textarea
                        rows={2}
                        value={customerAddress}
                        onChange={e => setCustomerAddress(e.target.value)}
                        placeholder="House no, street, locality..."
                        className="w-full px-3 py-1.5 bg-[#20080E] border border-[#D4AF37]/30 rounded text-xs text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                )}

                {/* Customer Contact */}
                <div className="space-y-2 pt-2 border-t border-[#D4AF37]/15">
                  <div>
                    <label className="block text-[11px] text-[#FAF6EE]/70 mb-1">
                      Customer Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="e.g. S. Meenakshi"
                      className="w-full px-3 py-1.5 bg-[#20080E] border border-[#D4AF37]/30 rounded text-xs text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#FAF6EE]/70 mb-1">
                      Phone Number (WhatsApp) <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="e.g. +91 94431 82741"
                      className="w-full px-3 py-1.5 bg-[#20080E] border border-[#D4AF37]/30 rounded text-xs text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Itemized Cart List */
              <div className="space-y-4">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-[#1C080E] border border-[#D4AF37]/20 rounded relative group"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded border border-[#D4AF37]/30 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-[#FAF6EE] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#FAF6EE]/40 hover:text-red-400 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] text-[#D4AF37]">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-[#D4AF37]/60"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                          {item.selectedSize && <span>· {item.selectedSize}</span>}
                        </div>

                        {/* Blouse Stitching Tag */}
                        {item.blouseStitching && (
                          <div className="mt-1.5 p-1.5 bg-[#2A0910] rounded border border-[#D4AF37]/30 text-[10px] text-[#F3E5AB] flex items-center gap-1">
                            <Scissors className="w-3 h-3 text-[#D4AF37]" />
                            <span>
                              Custom Tailoring: Bust {item.blouseStitching.bust}", Sleeve{' '}
                              {item.blouseStitching.sleeveLength}"
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Qty & Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D4AF37]/10">
                        <div className="flex items-center gap-2 bg-[#25080E] rounded px-2 py-0.5 border border-[#D4AF37]/30">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-[#FAF6EE]/70 hover:text-[#FAF6EE]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-[#F3E5AB]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-[#FAF6EE]/70 hover:text-[#FAF6EE]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-sm font-bold text-[#F3E5AB] tabular-nums">
                          ₹
                          {(
                            (item.product.salePrice || item.product.price) * item.quantity
                          ).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Box */}
                <div className="p-3 bg-[#1C080E] border border-[#D4AF37]/20 rounded">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="Coupon (e.g. GOKULAMFESTIVE)"
                      className="flex-1 px-3 py-1.5 bg-[#25080E] border border-[#D4AF37]/30 rounded text-xs text-[#FAF6EE] uppercase focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] text-xs font-bold rounded transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {appliedCoupon && (
                    <span className="text-[10px] text-emerald-400 mt-1 block font-medium">
                      ✓ Coupon {appliedCoupon} applied! (Saved ₹{discountAmount.toLocaleString('en-IN')})
                    </span>
                  )}
                  {couponError && (
                    <span className="text-[10px] text-red-400 mt-1 block">{couponError}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Buttons */}
          {cart.length > 0 && !orderConfirmedNumber && (
            <div className="p-6 bg-[#1A070C] border-t border-[#D4AF37]/20 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#FAF6EE]/70">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>Festive Discount</span>
                    <span className="font-mono tabular-nums">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-base font-bold text-[#F3E5AB] pt-2 border-t border-[#D4AF37]/15">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {!isCheckingOut ? (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => handleConfirmOrder('whatsapp')}
                    className="w-full py-3 bg-[#1F4529] hover:bg-[#285A35] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-lg flex items-center justify-center gap-2 border border-emerald-500/40"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Order on WhatsApp (Woraiyur)</span>
                  </button>

                  <button
                    onClick={() => handleConfirmOrder('standard')}
                    className="w-full py-2.5 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors text-center"
                  >
                    Confirm Store Booking (Pay in Store / COD)
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
