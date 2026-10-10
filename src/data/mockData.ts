import { Product, BannerCampaign, Coupon, Order, StitchingJob } from '../types';

// Keep the home page slide bar / hero background image as instructed:
// "try not to change the home page slide bar image, except this, change every product images with my uploaded image link"
export const HERO_IMAGE = '/src/assets/images/hero_silk_sari_zari_1791568116672.jpg';

// All 39 uploaded product images from Gokulam Textile & Furniture
export const UPLOADED_PRODUCT_IMAGES: string[] = [
  'https://i.postimg.cc/pLfkK2mz/Whats-App-Image-2026-10-10-at-11-42-07-AM.jpg', // 0
  'https://i.postimg.cc/0yYZ78zm/Whats-App-Image-2026-10-10-at-11-42-09-AM.jpg', // 1
  'https://i.postimg.cc/g2V43Yxh/Whats-App-Image-2026-10-10-at-11-42-10-AM.jpg', // 2
  'https://i.postimg.cc/Vkq4XYJb/Whats-App-Image-2026-10-10-at-11-42-11-AM.jpg', // 3
  'https://i.postimg.cc/rw1g58DC/Whats-App-Image-2026-10-10-at-11-42-12-AM.jpg', // 4
  'https://i.postimg.cc/9Qd1yWDY/Whats-App-Image-2026-10-10-at-11-42-13-AM.jpg', // 5
  'https://i.postimg.cc/0yYZ78zf/Whats-App-Image-2026-10-10-at-11-42-15-AM.jpg', // 6
  'https://i.postimg.cc/W4s8nQZ9/Whats-App-Image-2026-10-10-at-11-42-18-AM.jpg', // 7
  'https://i.postimg.cc/GmFzvc4q/Whats-App-Image-2026-10-10-at-11-42-18-AM-(1).jpg', // 8
  'https://i.postimg.cc/xd95RWmR/Whats-App-Image-2026-10-10-at-11-42-20-AM.jpg', // 9
  'https://i.postimg.cc/TPT09ZbQ/Whats-App-Image-2026-10-10-at-11-42-21-AM.jpg', // 10
  'https://i.postimg.cc/CKw7NW8P/Whats-App-Image-2026-10-10-at-11-42-22-AM.jpg', // 11
  'https://i.postimg.cc/cJdhmV3z/Whats-App-Image-2026-10-10-at-11-42-24-AM.jpg', // 12
  'https://i.postimg.cc/g0GsDfht/Whats-App-Image-2026-10-10-at-11-42-24-AM-(1).jpg', // 13
  'https://i.postimg.cc/VNzgR3My/Whats-App-Image-2026-10-10-at-11-42-25-AM.jpg', // 14
  'https://i.postimg.cc/FKhpZ2cX/Whats-App-Image-2026-10-10-at-11-42-26-AM.jpg', // 15
  'https://i.postimg.cc/cJdhmVYZ/Whats-App-Image-2026-10-10-at-11-42-27-AM.jpg', // 16
  'https://i.postimg.cc/mrTjw0Ms/Whats-App-Image-2026-10-10-at-11-42-27-AM-(1).jpg', // 17
  'https://i.postimg.cc/JhRxq9Jr/Whats-App-Image-2026-10-10-at-11-42-28-AM.jpg', // 18
  'https://i.postimg.cc/yN7jPw9d/Whats-App-Image-2026-10-10-at-11-42-29-AM.jpg', // 19
  'https://i.postimg.cc/BvJpgdDZ/Whats-App-Image-2026-10-10-at-11-42-29-AM-(1).jpg', // 20
  'https://i.postimg.cc/nLTkw0Yn/Whats-App-Image-2026-10-10-at-11-42-30-AM.jpg', // 21
  'https://i.postimg.cc/nLTkw0YJ/Whats-App-Image-2026-10-10-at-11-42-30-AM-(1).jpg', // 22
  'https://i.postimg.cc/TPQ9HCqR/Whats-App-Image-2026-10-10-at-11-42-31-AM.jpg', // 23
  'https://i.postimg.cc/W4SnfX6q/Whats-App-Image-2026-10-10-at-11-42-32-AM.jpg', // 24
  'https://i.postimg.cc/wBFVb0cM/Whats-App-Image-2026-10-10-at-11-42-32-AM-(1).jpg', // 25
  'https://i.postimg.cc/Sssr0CDg/Whats-App-Image-2026-10-10-at-11-42-33-AM.jpg', // 26
  'https://i.postimg.cc/Pxx4GY2w/Whats-App-Image-2026-10-10-at-11-42-33-AM-(1).jpg', // 27
  'https://i.postimg.cc/V66RynDV/Whats-App-Image-2026-10-10-at-11-42-34-AM.jpg', // 28
  'https://i.postimg.cc/tTMz9JMw/Whats-App-Image-2026-10-10-at-11-42-35-AM.jpg', // 29
  'https://i.postimg.cc/XJJ8MdQh/Whats-App-Image-2026-10-10-at-11-42-35-AM-(1).jpg', // 30
  'https://i.postimg.cc/Jn2QR02f/Whats-App-Image-2026-10-10-at-11-42-36-AM.jpg', // 31
  'https://i.postimg.cc/26KxCytN/Whats-App-Image-2026-10-10-at-11-42-37-AM.jpg', // 32
  'https://i.postimg.cc/HxhtTnNC/Whats-App-Image-2026-10-10-at-11-42-38-AM.jpg', // 33
  'https://i.postimg.cc/DZMc70NT/Whats-App-Image-2026-10-10-at-11-42-41-AM.jpg', // 34
  'https://i.postimg.cc/Tw4cT1sG/Whats-App-Image-2026-10-10-at-11-42-42-AM.jpg', // 35
  'https://i.postimg.cc/DZMc70N7/Whats-App-Image-2026-10-10-at-11-42-43-AM.jpg', // 36
  'https://i.postimg.cc/9MnBc0kQ/Whats-App-Image-2026-10-10-at-11-42-44-AM.jpg', // 37
  'https://i.postimg.cc/nzP1nrWc/Whats-App-Image-2026-10-10-at-11-42-44-AM-(1).jpg'  // 38
];

// Featured collection images using authentic uploaded photos
export const FESTIVE_COLLECTION_IMAGE = UPLOADED_PRODUCT_IMAGES[0];
export const FURNITURE_LIVING_IMAGE = UPLOADED_PRODUCT_IMAGES[7];
export const MACRO_LOOM_IMAGE = UPLOADED_PRODUCT_IMAGES[2];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Kalyana Kanjivaram Pure Zari Silk Saree',
    nameTa: 'கல்யாண காஞ்சிபுரம் பட்டுப் புடவை',
    sku: 'GOK-SILK-001',
    category: 'Silk & Tissue Sarees',
    categoryTa: 'பட்டு & டிஷ்யூ புடவைகள்',
    subcategory: 'Bridal Kanjivaram',
    fabric: 'Pure Mulberry Silk with 3G Gold Zari',
    price: 18499,
    salePrice: 15999,
    stock: 19,
    gstRate: '5%',
    hsn: '5007',
    images: [
      UPLOADED_PRODUCT_IMAGES[0],
      UPLOADED_PRODUCT_IMAGES[1],
      UPLOADED_PRODUCT_IMAGES[2]
    ],
    colorVariants: [
      { name: 'Kumkum Crimson', nameTa: 'குங்கும சிவப்பு', hex: '#800020' },
      { name: 'Mayil Peacock Teal', nameTa: 'மயில் கழுத்து நீலம்', hex: '#004953' },
      { name: 'Mambazham Mango Yellow', nameTa: 'மாம்பழ மஞ்சள்', hex: '#FFAE42' }
    ],
    sizeVariants: [
      { name: 'Standard 6.2m (with Blouse)', inStock: true, stockCount: 19 }
    ],
    occasion: ['Wedding', 'Festive', 'Deepavali'],
    isBlouseStitchingAvailable: true,
    isFeatured: true,
    isPublished: true,
    dimensions: '6.2 Meters with Running Blouse Piece',
    description: 'Authentic pure silk woven with opulent traditional zari motifs. Sourced directly from master weavers of South India and showcased at our Woraiyur boutique.',
    descriptionTa: 'பாரம்பரிய தூய ஜரிகை வேலைப்பாடுகளுடன் கூடிய அசல் காஞ்சிபுரம் பட்டு. உறையூர் கோகுலம் டெக்ஸ்டைல்ஸின் தலைமுறை பெருமை.',
    rating: 4.9,
    reviewsCount: 48
  },
  {
    id: 'prod-2',
    name: 'Shimmering Tissue Silk Festive Brocade Saree',
    nameTa: 'மின்னும் டிஷ்யூ பட்டு பண்டிகை புடவை',
    sku: 'GOK-SILK-002',
    category: 'Silk & Tissue Sarees',
    categoryTa: 'பட்டு & டிஷ்யூ புடவைகள்',
    subcategory: 'Tissue Silk',
    fabric: 'Metallic Tissue Silk with Golden Weave',
    price: 11200,
    salePrice: 9450,
    stock: 18,
    gstRate: '5%',
    hsn: '5007',
    images: [
      UPLOADED_PRODUCT_IMAGES[3],
      UPLOADED_PRODUCT_IMAGES[4],
      UPLOADED_PRODUCT_IMAGES[5]
    ],
    colorVariants: [
      { name: 'Antique Gold', nameTa: 'பழங்கால தங்கம்', hex: '#D4AF37' },
      { name: 'Rani Rose Gold', nameTa: 'ராணி பிங்க்', hex: '#B76E79' },
      { name: 'Emerald Forest', nameTa: 'மரகத பச்சை', hex: '#097969' }
    ],
    sizeVariants: [
      { name: 'Standard 6.2m', inStock: true, stockCount: 18 }
    ],
    occasion: ['Deepavali', 'Reception', 'Festival'],
    isBlouseStitchingAvailable: true,
    isFeatured: true,
    isPublished: true,
    dimensions: '6.2 Meters with Brocade Blouse Piece',
    description: 'Extremely lightweight, opulent drape with multi-tonal golden shimmer. Perfect for evening Deepavali gatherings and festive celebrations.',
    descriptionTa: 'மென்மையான ஒளிவீசும் தங்க டிஷ்யூ இழை நெசவு. தீபாவளி திருநாளுக்கான சிறந்த தேர்வு.',
    rating: 4.8,
    reviewsCount: 32
  },
  {
    id: 'prod-3',
    name: 'Chettinad Traditional Handloom Cotton Saree',
    nameTa: 'செட்டிநாடு கைத்தறி பருத்தி புடவை',
    sku: 'GOK-COT-001',
    category: 'Cotton & Daily Sarees',
    categoryTa: 'பருத்தி & அன்றாட புடவைகள்',
    subcategory: 'Chettinad Cotton',
    fabric: '100% Breathable Combed Cotton',
    price: 2450,
    salePrice: 1899,
    stock: 24,
    gstRate: '5%',
    hsn: '6204',
    images: [
      UPLOADED_PRODUCT_IMAGES[6],
      UPLOADED_PRODUCT_IMAGES[7],
      UPLOADED_PRODUCT_IMAGES[8]
    ],
    colorVariants: [
      { name: 'Mustard & Maroon', nameTa: 'கடுகு & மெரூன்', hex: '#9E2A2B' },
      { name: 'Indigo & Turmeric', nameTa: 'நீலம் & மஞ்சள்', hex: '#1D3557' }
    ],
    sizeVariants: [
      { name: 'Standard 5.5m', inStock: true, stockCount: 24 }
    ],
    occasion: ['Daily Wear', 'Temple Visit', 'Office'],
    isBlouseStitchingAvailable: true,
    isFeatured: true,
    isPublished: true,
    dimensions: '5.5 Meters Cotton Weave',
    description: 'Handcrafted by seasoned weavers in Tamil Nadu with contrast temple borders. Soft, airy, and enduring comfort for everyday grace.',
    descriptionTa: '100% தூய பருத்தி கைத்தறி. கோவில் வழிபாடு மற்றும் தினசரி பயன்பாட்டிற்கு உகந்த குளிர்ச்சி.',
    rating: 4.7,
    reviewsCount: 65
  },
  {
    id: 'prod-4',
    name: 'Chanderi Silk Anarkali Suit Set with Zari Dupatta',
    nameTa: 'சந்தேரி அனார்கலி சுடிதார் செட்',
    sku: 'GOK-DES-001',
    category: 'Chudidars & Designer Wear',
    categoryTa: 'சுடிதார் & டிசைனர் உடைகள்',
    subcategory: 'Anarkali Sets',
    fabric: 'Chanderi Silk with Santoon Lining',
    price: 4999,
    salePrice: 3899,
    stock: 17,
    gstRate: '5%',
    hsn: '6204',
    images: [
      UPLOADED_PRODUCT_IMAGES[9],
      UPLOADED_PRODUCT_IMAGES[10],
      UPLOADED_PRODUCT_IMAGES[11]
    ],
    colorVariants: [
      { name: 'Deep Wine', nameTa: 'டார்க் வைன்', hex: '#471221' },
      { name: 'Peacock Blue', nameTa: 'மயில் நீலம்', hex: '#0A4D52' }
    ],
    sizeVariants: [
      { name: 'M (38)', inStock: true, stockCount: 5 },
      { name: 'L (40)', inStock: true, stockCount: 6 },
      { name: 'XL (42)', inStock: true, stockCount: 6 }
    ],
    occasion: ['Festive', 'Party', 'Family Gathering'],
    isBlouseStitchingAvailable: false,
    isFeatured: true,
    isPublished: true,
    dimensions: 'Kurta 48" length, Pant 38", Dupatta 2.3m',
    description: 'Intricately embroidered neckline with a rich handloom zari dupatta. Tailored silhouette designed for grand ease.',
    descriptionTa: 'அழகிய எம்பிராய்டரி வேலைப்பாடு மற்றும் ஜரிகை துப்பட்டா கொண்ட ஆடம்பர சுடிதார்.',
    rating: 4.6,
    reviewsCount: 19
  },
  {
    id: 'prod-5',
    name: 'Woraiyur Pure Silk Veshti & Angavastram Set',
    nameTa: 'உறையூர் பட்டு வேஷ்டி மற்றும் அங்வஸ்திரம்',
    sku: 'GOK-ETH-001',
    category: 'Kids & Family Ethnic Wear',
    categoryTa: 'குழந்தைகள் & குடும்ப பாரம்பர்யம்',
    subcategory: 'Men Ethnic Silk',
    fabric: 'Pure Silk with Gold Jari Border (8 Muzham)',
    price: 5200,
    salePrice: 4250,
    stock: 22,
    gstRate: '5%',
    hsn: '6204',
    images: [
      UPLOADED_PRODUCT_IMAGES[12],
      UPLOADED_PRODUCT_IMAGES[13],
      UPLOADED_PRODUCT_IMAGES[14]
    ],
    colorVariants: [
      { name: 'Ivory Cream with Gold Border', nameTa: 'சந்தன நிறம் / தங்கம்', hex: '#FAF0E6' }
    ],
    sizeVariants: [
      { name: '8 Muzham + Shalu', inStock: true, stockCount: 22 }
    ],
    occasion: ['Pooja', 'Wedding', 'Pongal'],
    isBlouseStitchingAvailable: false,
    isFeatured: true,
    isPublished: true,
    dimensions: 'Veshti: 3.6m × 1.25m, Angavastram: 2.2m',
    description: 'A symbol of dignity in Tamil households. Handloom woven with Mayilkan borders for Muhurtham and festive ceremonies.',
    descriptionTa: 'திருமண முகூர்த்தம் மற்றும் விசேஷங்களுக்கு ஏற்ற பாரம்பரிய 8 முழ பட்டு வேஷ்டி சட்டை செட்.',
    rating: 4.9,
    reviewsCount: 54
  },
  {
    id: 'prod-6',
    name: 'Handcrafted Teakwood Heritage King Bed with Cane Headboard',
    nameTa: 'தேக்குமர ஹெரிடேஜ் கிங் கட்டில் (பிரம்பு வேலைப்பாடு)',
    sku: 'GOK-FURN-001',
    category: 'Furniture',
    categoryTa: 'மர தளவாடங்கள்',
    subcategory: 'Beds & Cots',
    fabric: 'Solid Nilambur Teakwood & Natural Rattan Cane',
    price: 48500,
    salePrice: 42000,
    stock: 14,
    gstRate: '12%',
    hsn: '9403',
    images: [
      UPLOADED_PRODUCT_IMAGES[15],
      UPLOADED_PRODUCT_IMAGES[16],
      UPLOADED_PRODUCT_IMAGES[17]
    ],
    colorVariants: [
      { name: 'Natural Sandalwood Teak', nameTa: 'இயற்கை தேக்கு', hex: '#7C4700' },
      { name: 'Deep Walnut Rosewood', nameTa: 'ரோஸ்வுட் நிறம்', hex: '#3E2723' }
    ],
    sizeVariants: [
      { name: 'King (78" × 72")', inStock: true, stockCount: 8 },
      { name: 'Queen (78" × 60")', inStock: true, stockCount: 6 }
    ],
    occasion: ['Home Renovations', 'Wedding Gifts', 'Master Bedroom'],
    isBlouseStitchingAvailable: false,
    isFeatured: true,
    isPublished: true,
    dimensions: '78" Length × 72" Width × 45" Headboard Height',
    description: 'Made from seasoned solid teak with traditional mortise-and-tenon joinery and breathable natural rattan webbing. Built to last for generations.',
    descriptionTa: 'உயர்தர தேக்கு மரத்தால் கைவினைக் கலைஞர்களால் செய்யப்பட்ட உறுதியான பாரம்பரிய கட்டில். ஆயுள் முழுக்க உழைக்கும் தரம்.',
    rating: 5.0,
    reviewsCount: 14
  },
  {
    id: 'prod-7',
    name: 'Carved Sheesham Pooja Mandapam with Brass Bell Mounts',
    nameTa: 'செதுக்கப்பட்ட பூஜா மண்டபம் (பித்தளை மணிகளுடன்)',
    sku: 'GOK-FURN-002',
    category: 'Pooja & Festive Home',
    categoryTa: 'பூஜை & இல்ல அலங்காரம்',
    subcategory: 'Pooja Units',
    fabric: 'Seasoned Sheesham Wood with Pure Brass Details',
    price: 16800,
    salePrice: 13999,
    stock: 15,
    gstRate: '12%',
    hsn: '9403',
    images: [
      UPLOADED_PRODUCT_IMAGES[18],
      UPLOADED_PRODUCT_IMAGES[19],
      UPLOADED_PRODUCT_IMAGES[20]
    ],
    colorVariants: [
      { name: 'Heritage Sandal Teak Polish', nameTa: 'பாரம்பரிய பாலிஷ்', hex: '#5D4037' }
    ],
    sizeVariants: [
      { name: 'Large (36" × 20" × 48")', inStock: true, stockCount: 15 }
    ],
    occasion: ['Housewarming', 'Deepavali', 'Daily Pooja'],
    isBlouseStitchingAvailable: false,
    isFeatured: true,
    isPublished: true,
    dimensions: '36" W × 20" D × 48" H',
    description: 'Temple-gopuram inspired top crest with genuine brass bells that ring with divinity. Includes pull-out diya tray and storage drawers.',
    descriptionTa: 'வீட்டின் பூஜை அறைக்கு தெய்வீக சோபை தரும் கோபுர வடிவிலான கலைநயமிக்க மர பூஜா யூனிட்.',
    rating: 4.9,
    reviewsCount: 29
  },
  {
    id: 'prod-8',
    name: 'Luxury 400 TC Cotton Jaipuri Bedsheet Set (Double Bed + 2 Pillows)',
    nameTa: '400 TC ஆடம்பர காட்டன் படுக்கை விரிப்பு செட்',
    sku: 'GOK-HOME-001',
    category: 'Home Furnishings',
    categoryTa: 'ஹோம் டெக்ஸ்டைல்ஸ்',
    subcategory: 'Bedsheets & Covers',
    fabric: '100% Super Combed Long-Staple Cotton (400 TC)',
    price: 2899,
    salePrice: 2199,
    stock: 28,
    gstRate: '5%',
    hsn: '6302',
    images: [
      UPLOADED_PRODUCT_IMAGES[21],
      UPLOADED_PRODUCT_IMAGES[22],
      UPLOADED_PRODUCT_IMAGES[23]
    ],
    colorVariants: [
      { name: 'Royal Gold & Ivory', nameTa: 'தங்கம் & சந்தனம்', hex: '#E5D3B3' },
      { name: 'Peacock Motifs Sage', nameTa: 'மயில் பச்சை', hex: '#7E9F8E' }
    ],
    sizeVariants: [
      { name: 'King Size 108" × 108"', inStock: true, stockCount: 28 }
    ],
    occasion: ['Festival Refresh', 'Daily Luxury', 'Gifting'],
    isBlouseStitchingAvailable: false,
    isFeatured: false,
    isPublished: true,
    dimensions: 'Bedsheet: 274cm × 274cm, Pillow Covers: 46cm × 69cm',
    description: 'Ultra-soft, wrinkle-resistant sateen cotton weave with timeless South Indian motifs. Glides smooth and breathes effortless cool.',
    descriptionTa: '100% பிரீமியம் பருத்தி துணி. படுக்கையறைக்கு அரச தோற்றமளிக்கும் விரிப்பு.',
    rating: 4.8,
    reviewsCount: 38
  },
  {
    id: 'prod-9',
    name: 'Festive Jacquard Silk Salwar Kurti 3-Piece Ensemble',
    nameTa: 'பண்டிகை ஜாக்கார்ட் பட்டு சல்வார் குர்தி செட்',
    sku: 'GOK-DES-002',
    category: 'Chudidars & Designer Wear',
    categoryTa: 'சுடிதார் & டிசைனர் உடைகள்',
    subcategory: '3 piece sets',
    fabric: 'Pure Jacquard Silk with Silk Chiffon Dupatta',
    price: 3899,
    salePrice: 2999,
    stock: 20,
    gstRate: '5%',
    hsn: '6204',
    images: [
      UPLOADED_PRODUCT_IMAGES[24],
      UPLOADED_PRODUCT_IMAGES[25],
      UPLOADED_PRODUCT_IMAGES[26]
    ],
    colorVariants: [
      { name: 'Ruby Vermilion', nameTa: 'மாணிக்க சிவப்பு', hex: '#9B111E' },
      { name: 'Mustard Gold', nameTa: 'கடுகு தங்கம்', hex: '#E1AD01' }
    ],
    sizeVariants: [
      { name: 'M (38)', inStock: true, stockCount: 6 },
      { name: 'L (40)', inStock: true, stockCount: 8 },
      { name: 'XL (42)', inStock: true, stockCount: 6 }
    ],
    occasion: ['Deepavali', 'Family Festive', 'Celebration'],
    isBlouseStitchingAvailable: false,
    isFeatured: true,
    isPublished: true,
    dimensions: 'Top 46", Pants 39", Stole 2.2m',
    description: 'Exquisite festive set with gold thread work along the placket and cuffs, paired with a matching flowy dupatta.',
    descriptionTa: 'கோகுலத்தின் நேர்த்தியான விசேஷ சுடிதார் செட். திருவிழா நாட்களுக்கு ஏற்ற தேர்வு.',
    rating: 4.8,
    reviewsCount: 22
  },
  {
    id: 'prod-10',
    name: 'South Indian Pure Soft Silk Temple Saree with Rich Pallu',
    nameTa: 'தென்னிந்திய சாப்ட் சில்க் கோவில் பார்டர் புடவை',
    sku: 'GOK-SILK-003',
    category: 'Silk & Tissue Sarees',
    categoryTa: 'பட்டு & டிஷ்யூ புடவைகள்',
    subcategory: 'Soft Silk',
    fabric: 'Featherlight Soft Silk with Antique Temple Border',
    price: 8999,
    salePrice: 7499,
    stock: 16,
    gstRate: '5%',
    hsn: '5007',
    images: [
      UPLOADED_PRODUCT_IMAGES[27],
      UPLOADED_PRODUCT_IMAGES[28],
      UPLOADED_PRODUCT_IMAGES[29]
    ],
    colorVariants: [
      { name: 'Rani Pink & Violet', nameTa: 'ராணி பிங்க் & ஊதா', hex: '#8B008B' },
      { name: 'Teal & Antique Copper', nameTa: 'நீலம் & செம்பு', hex: '#008080' }
    ],
    sizeVariants: [
      { name: 'Standard 6.2m', inStock: true, stockCount: 16 }
    ],
    occasion: ['Reception', 'Festive', 'Gifting'],
    isBlouseStitchingAvailable: true,
    isFeatured: true,
    isPublished: true,
    dimensions: '6.2 Meters with Blouse Piece',
    description: 'Supple, featherweight soft silk with rich antique finish zari work. Drapes effortlessly and flatters every silhouette.',
    descriptionTa: 'எளிதாக அணியக்கூடிய மிருதுவான சாப்ட் பட்டுப் புடவை. நாள் முழுதும் சௌகரியம் தரும்.',
    rating: 4.9,
    reviewsCount: 41
  },
  {
    id: 'prod-11',
    name: 'Madurai Traditional Sungudi Cotton Saree',
    nameTa: 'மதுரை பாரம்பரிய சுங்குடி பருத்தி புடவை',
    sku: 'GOK-COT-002',
    category: 'Cotton & Daily Sarees',
    categoryTa: 'பருத்தி & அன்றாட புடவைகள்',
    subcategory: 'Sungudi Cotton',
    fabric: 'Pure Cotton with Ring Tie-Dye Motifs',
    price: 1899,
    salePrice: 1499,
    stock: 30,
    gstRate: '5%',
    hsn: '6204',
    images: [
      UPLOADED_PRODUCT_IMAGES[30],
      UPLOADED_PRODUCT_IMAGES[31],
      UPLOADED_PRODUCT_IMAGES[32]
    ],
    colorVariants: [
      { name: 'Kurinji Purple', nameTa: 'குறிஞ்சி ஊதா', hex: '#4B0082' },
      { name: 'Kumkum Red', nameTa: 'குங்கும சிவப்பு', hex: '#A30000' }
    ],
    sizeVariants: [
      { name: 'Standard 5.5m', inStock: true, stockCount: 30 }
    ],
    occasion: ['Daily Wear', 'Summer Refresh', 'College / Office'],
    isBlouseStitchingAvailable: true,
    isFeatured: false,
    isPublished: true,
    dimensions: '5.5 Meters Breathable Sungudi',
    description: 'Iconic Tamil Nadu sungudi dots with bright zari borders. Light, airy, and naturally dyed for warm weather.',
    descriptionTa: 'கைவினை சுங்குடி வேலைப்பாடுகளுடன் கூடிய தரமான பருத்தி புடவை.',
    rating: 4.7,
    reviewsCount: 28
  },
  {
    id: 'prod-12',
    name: 'Heritage Teakwood 6-Seater Dining Table with Cushioned Chairs',
    nameTa: 'ஹெரிடேஜ் தேக்குமர 6-இருக்கை டைனிங் டேபிள் செட்',
    sku: 'GOK-FURN-003',
    category: 'Furniture',
    categoryTa: 'மர தளவாடங்கள்',
    subcategory: 'Dining Sets',
    fabric: 'Solid Nilambur Teakwood with Brass Accents',
    price: 62000,
    salePrice: 54999,
    stock: 8,
    gstRate: '12%',
    hsn: '9403',
    images: [
      UPLOADED_PRODUCT_IMAGES[33],
      UPLOADED_PRODUCT_IMAGES[34],
      UPLOADED_PRODUCT_IMAGES[35]
    ],
    colorVariants: [
      { name: 'Warm Teak Polish', nameTa: 'தேக்கு பாலிஷ்', hex: '#6E473B' }
    ],
    sizeVariants: [
      { name: '6-Seater (6ft × 3.5ft)', inStock: true, stockCount: 8 }
    ],
    occasion: ['Home Renovations', 'Family Dining', 'Wedding Gift'],
    isBlouseStitchingAvailable: false,
    isFeatured: true,
    isPublished: true,
    dimensions: '72" Length × 40" Width × 30" Height',
    description: 'Grand dining ensemble built from seasoned teakwood with ergonomic cushioned chairs upholstered in stain-resistant woven fabric.',
    descriptionTa: 'குடும்பத்துடன் கூடி உணவருந்த திருச்சி கைவினைஞர்களின் கம்பீரமான தேக்கு மர டைனிங் செட்.',
    rating: 5.0,
    reviewsCount: 16
  },
  {
    id: 'prod-13',
    name: 'Traditional Pattu Pavadai Silk Lehenga for Girls',
    nameTa: 'பாரம்பரிய பட்டு பாவாடை சட்டை செட் (பெண் குழந்தைகள்)',
    sku: 'GOK-ETH-002',
    category: 'Kids & Family Ethnic Wear',
    categoryTa: 'குழந்தைகள் & குடும்ப பாரம்பர்யம்',
    subcategory: 'Girls Festive',
    fabric: 'Pure Art Silk with Gold Zari Border',
    price: 2999,
    salePrice: 2299,
    stock: 25,
    gstRate: '5%',
    hsn: '6204',
    images: [
      UPLOADED_PRODUCT_IMAGES[36],
      UPLOADED_PRODUCT_IMAGES[37],
      UPLOADED_PRODUCT_IMAGES[38]
    ],
    colorVariants: [
      { name: 'Kalyani Green & Pink', nameTa: 'பச்சை & இளஞ்சிவப்பு', hex: '#2E8B57' },
      { name: 'Gold & Maroon', nameTa: 'தங்கம் & மெரூன்', hex: '#B8860B' }
    ],
    sizeVariants: [
      { name: 'Age 4-6', inStock: true, stockCount: 8 },
      { name: 'Age 7-9', inStock: true, stockCount: 9 },
      { name: 'Age 10-12', inStock: true, stockCount: 8 }
    ],
    occasion: ['Deepavali', 'Pongal', 'Family Weddings', 'Ear Piercing'],
    isBlouseStitchingAvailable: false,
    isFeatured: true,
    isPublished: true,
    dimensions: 'Pleated Skirt + Embellished Blouse Top',
    description: 'Vibrant festive silk pavadai set tailored with soft inner lining for children\'s comfort during celebrations.',
    descriptionTa: 'குழந்தைகளுக்கு உறுத்தாத மென்மையான லைனிங் கொண்ட வண்ணமயமான பட்டுப் பாவாடை செட்.',
    rating: 4.9,
    reviewsCount: 35
  }
];

export const INITIAL_CAMPAIGNS: BannerCampaign[] = [
  {
    id: 'camp-1',
    title: 'Deepavali Mahotsavam 2026',
    titleTa: 'தீபாவளி மகா உற்சவம் 2026',
    subtitle: 'Exclusive Silk Sarees & Handcrafted Teakwood Furniture — Special Woraiyur Festive Pricing',
    subtitleTa: 'அசல் பட்டுப் புடவைகள் & தேக்கு மர தளவாடங்கள் — பிரத்யேக தீபாவளி ஆஃபர்கள்',
    badge: 'FESTIVAL SPECIAL',
    badgeTa: 'தீபாவளி சிறப்பு',
    targetDate: '2026-11-08T00:00:00.000Z',
    isActive: true,
    discountTag: 'UP TO 40% OFF + FREE BLOUSE STITCHING'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'GOKULAMFESTIVE',
    discountPercent: 15,
    minOrder: 4999,
    maxUses: 500,
    usedCount: 84,
    isActive: true,
    expiryDate: '2026-11-30'
  },
  {
    id: 'coup-2',
    code: 'WORAIYUR500',
    flatDiscount: 500,
    minOrder: 3000,
    maxUses: 200,
    usedCount: 43,
    isActive: true,
    expiryDate: '2026-12-31'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'GOK-2026-8941',
    customerName: 'Meenakshi Sundaram',
    customerPhone: '+91 94431 82741',
    customerAddress: '65a, Nawab Thottam Main Road, Woraiyur, Trichy',
    pincode: '620003',
    deliveryType: 'pickup',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colorVariants[0],
        selectedSize: 'Standard 6.2m (with Blouse)',
        quantity: 1,
        blouseStitching: {
          bust: '38',
          length: '14.5',
          waist: '32',
          sleeveLength: '10',
          sleeveType: 'Elbow Length with Zari Border',
          frontNeck: 'U-Neck 6.5"',
          backNeck: 'Deep Pot Neck with Dori',
          notes: 'Golden piping around sleeve edge. Deliver before Thursday pooja.'
        }
      }
    ],
    subtotal: 15999,
    discount: 500,
    total: 15499,
    status: 'Stitching',
    whatsappSent: true,
    createdAt: '2026-10-09T08:30:00.000Z'
  },
  {
    id: 'ord-102',
    orderNumber: 'GOK-2026-8942',
    customerName: 'Karthik Raja',
    customerPhone: '+91 98424 15902',
    customerAddress: '15, Nachiar Koil Street, Woraiyur, Trichy',
    pincode: '620003',
    deliveryType: 'delivery',
    items: [
      {
        id: 'item-2',
        productId: 'prod-6',
        product: INITIAL_PRODUCTS[5],
        selectedColor: INITIAL_PRODUCTS[5].colorVariants[0],
        selectedSize: 'King (78" × 72")',
        quantity: 1
      }
    ],
    subtotal: 42000,
    discount: 2000,
    total: 40000,
    status: 'Confirmed',
    whatsappSent: true,
    createdAt: '2026-10-09T09:15:00.000Z'
  }
];

export const INITIAL_STITCHING_JOBS: StitchingJob[] = [
  {
    id: 'st-01',
    orderNumber: 'GOK-2026-8941',
    customerName: 'Meenakshi Sundaram',
    customerPhone: '+91 94431 82741',
    sareeTitle: 'Kalyana Kanjivaram Pure Zari Silk Saree',
    measurements: {
      bust: '38',
      length: '14.5',
      waist: '32',
      sleeveLength: '10',
      sleeveType: 'Elbow Length with Zari Border',
      frontNeck: 'U-Neck 6.5"',
      backNeck: 'Deep Pot Neck with Dori',
      notes: 'Golden piping around sleeve edge. Deliver before Thursday pooja.'
    },
    status: 'Stitching',
    dueDate: '2026-10-14',
    tailorAssigned: 'Master Murugesan (Woraiyur Unit)'
  }
];

export const CATEGORIES_LIST = [
  { id: 'cat-silk', name: 'Silk & Tissue Sarees', nameTa: 'பட்டு & டிஷ்யூ புடவைகள்', group: 'textiles' },
  { id: 'cat-cotton', name: 'Cotton & Daily Sarees', nameTa: 'பருத்தி & அன்றாட புடவைகள்', group: 'textiles' },
  { id: 'cat-chudidar', name: 'Chudidars & Designer Wear', nameTa: 'சுடிதார் & டிசைனர் உடைகள்', group: 'textiles' },
  { id: 'cat-ethnic', name: 'Kids & Family Ethnic Wear', nameTa: 'குழந்தைகள் & குடும்ப பாரம்பர்யம்', group: 'textiles' },
  { id: 'cat-nighties', name: 'Women\'s Nighties & Daily Wear', nameTa: 'நைட்டி & அன்றாட ஆடைகள்', group: 'textiles' },
  { id: 'cat-mens', name: 'Men\'s Daily Wear', nameTa: 'ஆண்கள் அன்றாட உடைகள்', group: 'textiles' },
  { id: 'cat-inner', name: 'Innerwear Essentials', nameTa: 'உள்ளாடைகள்', group: 'textiles' },
  { id: 'cat-access', name: 'Fashion Accessories', nameTa: 'அலங்காரப் பொருட்கள்', group: 'textiles' },
  { id: 'cat-furniture', name: 'Furniture', nameTa: 'மர தளவாடங்கள்', group: 'furniture_home' },
  { id: 'cat-homefurnish', name: 'Home Furnishings', nameTa: 'ஹோம் டெக்ஸ்டைல்ஸ்', group: 'furniture_home' },
  { id: 'cat-kitchen', name: 'Kitchen & Dining Textiles', nameTa: 'டைனிங் டெக்ஸ்டைல்ஸ்', group: 'furniture_home' },
  { id: 'cat-pooja', name: 'Pooja & Festive Home', nameTa: 'பூஜை & இல்ல அலங்காரம்', group: 'furniture_home' }
];
