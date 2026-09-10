import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Heavyweight Studio Hoodie',
    tagline: '500 GSM Japanese French Terry with raw drop shoulders',
    price: 145,
    originalPrice: 175,
    category: 'Apparel',
    tags: ['Best Seller', 'Drop 04', 'Organic Cotton'],
    rating: 4.9,
    reviewsCount: 128,
    inStock: true,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578768079052-aa76e520036c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#D7D1C7' },
      { name: 'Obsidian Black', hex: '#1C1B1A' },
      { name: 'Washed Sage', hex: '#879483' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Crafted from custom-developed 500 GSM loopback cotton fleece. Designed with an architectural silhouette featuring seamless drop shoulders and double-needle reinforced ribbed trims.',
    details: [
      '100% GOTS certified organic combed cotton',
      'Pre-shrunk treatment eliminates tumble distortion',
      'Double-lined hood with hidden drawstring eyelets',
      'Custom silver-tone aglet finishes'
    ],
    materials: '100% Organic French Terry Cotton (500 GSM). Hand wash cold or dry clean recommended.'
  },
  {
    id: 'prod-2',
    name: 'Linear Ceramic Pour-Over & Carafe',
    tagline: 'Hand-thrown stoneware with micro-groove extraction',
    price: 88,
    category: 'Objects & Home',
    tags: ['Handmade', 'Ceramics', 'Kitchen'],
    rating: 4.8,
    reviewsCount: 64,
    inStock: true,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sand Matte', hex: '#E2DAD0' },
      { name: 'Charcoal Basalt', hex: '#3B3B3B' },
      { name: 'Terracotta Clay', hex: '#B86F58' }
    ],
    description: 'Sculptural ritual vessel engineered for balanced extraction. Internal parabolic spiral channels guide water flow rate precisely for full-bodied bloom and clarity.',
    details: [
      'Includes 600ml glass carafe and ceramic cone dripper',
      'Thermal retention glaze keeps brew hot longer',
      'Compatible with standard conical 02 filters',
      'Dishwasher safe; microwave safe carafe'
    ],
    materials: 'High-fire stoneware ceramic with non-porous food-grade matte glaze.'
  },
  {
    id: 'prod-3',
    name: 'Modular Cordura Crossbody Bag',
    tagline: 'Waterproof ballistic nylon with magnetic Fidlock clasp',
    price: 110,
    category: 'Everyday Carry',
    tags: ['Techwear', 'Waterproof', 'EDC'],
    rating: 4.9,
    reviewsCount: 92,
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#18181A' },
      { name: 'Ranger Olive', hex: '#4A5340' },
      { name: 'Concrete Grey', hex: '#8F9398' }
    ],
    description: 'Compact utility carrying system with weather-sealed YKK Aquaguard zippers and rapid-adjust seatbelt webbing strap with German Fidlock V-buckle.',
    details: [
      'Capacity: 3.5 Liters (fits iPad mini, compact camera, keys)',
      'Hidden passport and AirTag stash sleeve against body',
      'Ripstop interior lining with bright amber visibility',
      'Modular strap attachment converts to clutch pouch'
    ],
    materials: '500D Cordura® Ballistic Nylon with DWR water-repellent coating.'
  },
  {
    id: 'prod-4',
    name: 'Acoustic Studio Wireless Headphones',
    tagline: 'Anodized aluminum with memory foam lambskin pads',
    price: 320,
    originalPrice: 380,
    category: 'Tech & Audio',
    tags: ['Lossless Audio', 'ANC', 'Drop 04'],
    rating: 5.0,
    reviewsCount: 147,
    inStock: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Silver Aluminium', hex: '#D8D8DC' },
      { name: 'Midnight Jet', hex: '#111215' },
      { name: 'Dune Sand', hex: '#C6BAAA' }
    ],
    description: 'Beryllium-coated 40mm dynamic acoustic drivers deliver breathtaking clarity with physical tactile dial controls and active adaptive noise cancellation.',
    details: [
      '42 hours continuous battery life with fast charge (15m = 6 hrs)',
      'Bluetooth 5.3 with LDAC, aptX Adaptive and multipoint pairing',
      'Precision machined knurled rotary volume control',
      'Includes molded travel case and braided braided audio cable'
    ],
    materials: 'Anodized aerospace aluminum, stainless steel headband, memory foam earpads.'
  },
  {
    id: 'prod-5',
    name: 'Raw Edge Wool Chore Jacket',
    tagline: 'Boiled Shetland wool with horn button closures',
    price: 260,
    category: 'Apparel',
    tags: ['Outerwear', 'Natural Wool', 'Tailored'],
    rating: 4.8,
    reviewsCount: 42,
    inStock: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Melange', hex: '#2A2B2D' },
      { name: 'Camel Tan', hex: '#9C7A53' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Unstructured chore jacket tailored from heavyweight boiled wool. Combines utilitarian workwear heritage with minimalist tailoring.',
    details: [
      'Relaxed straight cut with room for layer undergarments',
      'Hand-sewn horn buttons and raw micro-hem finish',
      'Dual deep patch pockets and interior chest slip pocket',
      'Naturally water-resistant and thermoregulating'
    ],
    materials: '100% Shetland Virgin Boiled Wool. Dry clean only.'
  },
  {
    id: 'prod-6',
    name: 'Minimalist Monolithic Trainer',
    tagline: 'Italian vegetable-tanned calfskin with Vibram cupsole',
    price: 215,
    originalPrice: 245,
    category: 'Footwear',
    tags: ['Footwear', 'Made in Italy', 'Leather'],
    rating: 4.9,
    reviewsCount: 89,
    inStock: true,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Chalk White', hex: '#F0EFEA' },
      { name: 'All Black', hex: '#161616' },
      { name: 'Taupe Suede', hex: '#9E9488' }
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    description: 'Clean silhouette with tonal stitched margins. Hand-lasted in Civitanova Marche utilizing full-grain Italian leather that patinas beautifully over time.',
    details: [
      'Cushioned removable calfskin insole with arch support',
      'Durable Margom natural rubber outsole stitched 360°',
      'Includes tonal waxed cotton laces and cotton dust bags',
      'Unbranded minimalist tongue'
    ],
    materials: 'Full-Grain Italian Calf Leather, Natural Rubber Sole.'
  },
  {
    id: 'prod-7',
    name: 'Machined Brass Table Lamp',
    tagline: 'Solid brushed brass cylinder with omnidirectional diffuser',
    price: 190,
    category: 'Objects & Home',
    tags: ['Lighting', 'Machined Brass', 'Warm 2700K'],
    rating: 5.0,
    reviewsCount: 38,
    inStock: true,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Brushed Brass', hex: '#D2AB67' },
      { name: 'Oxidized Gunmetal', hex: '#3E4143' }
    ],
    description: 'Turned from a single billet of solid brass. Features a tactile step-less rotary dimmer with integrated warm 2700K diffused LED core.',
    details: [
      'USB-C rechargeable with 16h wireless runtime at medium brightness',
      'Weighted non-slip felt base prevents desk scratches',
      'Warm candlelight dimming curve (90+ CRI)',
      'Braided textile charging cable included'
    ],
    materials: 'CNC-Machined Solid Brass, Frosted Borosilicate Diffuser.'
  },
  {
    id: 'prod-8',
    name: 'Precision Mechanical Keyboard 75%',
    tagline: 'CNC milled aluminum body with lubricated linear switches',
    price: 240,
    category: 'Tech & Audio',
    tags: ['Workspace', 'Machined', 'Hot-Swap'],
    rating: 4.9,
    reviewsCount: 115,
    inStock: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Silver Lunar', hex: '#D6D6DB' },
      { name: 'Space Grey', hex: '#4B4D52' },
      { name: 'Retro Cream', hex: '#EBE5D8' }
    ],
    description: 'Engineered for tactile and auditory bliss. Gasket-mounted interior dampening plates with custom pre-lubed silent switches and dye-sub PBT keycaps.',
    details: [
      'Gasket mount plate configuration with PORON sound dampening',
      'Tri-mode connection: 2.4GHz wireless, Bluetooth 5.1, and USB-C',
      '4000mAh battery providing up to 200 hours between charges',
      'VIA / QMK reprogrammable firmware compatibility'
    ],
    materials: '6063 Anodized Aluminum, Brass Internal Weight, PBT Keycaps.'
  },
  {
    id: 'prod-9',
    name: 'Titanium Slim Card Wallet',
    tagline: 'Grade 5 aerospace titanium with RFID blocking chassis',
    price: 75,
    originalPrice: 90,
    category: 'Everyday Carry',
    tags: ['EDC', 'Titanium', 'Minimalist'],
    rating: 4.7,
    reviewsCount: 76,
    inStock: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606503825008-909a67e750ca?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512070679279-8988d32161be?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Raw Matte Titanium', hex: '#A3A4A8' },
      { name: 'DLC Midnight', hex: '#1E2022' }
    ],
    description: 'Thinnest profile card carrier on the market. Weighs only 44 grams, holding 1 to 12 cards with elastic expansion band and integrated cash strap.',
    details: [
      'Grade 5 Ti-6Al-4V titanium plates with chamfered edge bevels',
      'Full RFID / NFC scanning protection',
      'Thumb notch quick-eject access mechanism',
      'Lifetime guarantee against mechanical failure'
    ],
    materials: 'Aerospace Grade 5 Titanium with carbon-reinforced elastic band.'
  },
  {
    id: 'prod-10',
    name: 'Oversized Washed Linen Shirt',
    tagline: '100% Normandy flax linen with relaxed camp collar',
    price: 125,
    category: 'Apparel',
    tags: ['Summer Essential', 'Pure Linen', 'Relaxed'],
    rating: 4.8,
    reviewsCount: 51,
    inStock: true,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Natural Ecru', hex: '#EBE7DE' },
      { name: 'Sky Slate', hex: '#A8B7C5' },
      { name: 'Espresso Bean', hex: '#44372F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Garment washed for immediate broken-in drape. Breathable open-weave European flax linen keeps you cool with effortless drape and understated structure.',
    details: [
      'Camp cuban collar with French seam internal tailoring',
      'Mother of pearl natural button accents',
      'Box pleat back yoke for unimpeded arm movement',
      'Biodegradable and eco-friendly enzymatic wash'
    ],
    materials: '100% Normandy Flax Linen (180 GSM).'
  },
  {
    id: 'prod-11',
    name: 'Cast Iron Dutch Pan & Steamer',
    tagline: 'Pre-seasoned enamel cast iron with cedar steam insert',
    price: 165,
    category: 'Objects & Home',
    tags: ['Kitchen', 'Cast Iron', 'Artisanal'],
    rating: 4.9,
    reviewsCount: 68,
    inStock: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1584990347449-359bc7583693?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cast Charcoal', hex: '#262626' },
      { name: 'Warm Cream', hex: '#EDE8DF' }
    ],
    description: 'Multi-functional heirloom cookware designed for braising, searing, and gentle steaming. Heavy self-basting lid keeps moisture locked in.',
    details: [
      'Compatible with induction, gas, electric, and oven up to 500°F',
      'Includes Japanese cryptomeria cedar tiered steam basket',
      'Satin non-reactive vitreous enamel interior',
      'Generous ergonomic helper handles'
    ],
    materials: 'Cast iron core with multi-layer porcelain enamel and natural cedar.'
  },
  {
    id: 'prod-12',
    name: 'Suede Trail Runner Mules',
    tagline: 'Perforated water-resistant suede with cork-cushion footbed',
    price: 180,
    category: 'Footwear',
    tags: ['Slip-on', 'Vibram', 'Suede'],
    rating: 4.6,
    reviewsCount: 39,
    inStock: true,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Smokey Moss', hex: '#636B59' },
      { name: 'Desert Sand', hex: '#D2C4B1' }
    ],
    sizes: ['EU 41', 'EU 42', 'EU 43', 'EU 44'],
    description: 'An ergonomic hybrid slip-on combining athletic trail lugs with cozy slip-on comfort. Molded natural cork footbed contours to your foot structure.',
    details: [
      'Silky treated water-resistant nubuck suede upper',
      'Grippy Vibram MegaGrip trail compound outsole',
      'Elasticized tongue gusset for slip-on security',
      'Breathable antimicrobial mesh lining'
    ],
    materials: 'Waterproof Suede, Cork Composite Footbed, Vibram Rubber.'
  },
  {
    id: 'prod-13',
    name: 'Everyday Commuter Daypack 20L',
    tagline: 'Weatherproof canvas with magnetic laptop suspension sleeve',
    price: 170,
    originalPrice: 195,
    category: 'Everyday Carry',
    tags: ['Commute', 'Laptop 16"', 'Canvas'],
    rating: 4.9,
    reviewsCount: 183,
    inStock: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Carbon Black', hex: '#1C1C1F' },
      { name: 'Field Olive', hex: '#484E43' },
      { name: 'Navy Deep', hex: '#263238' }
    ],
    description: 'Streamlined backpack built for modern city navigation. Features floating 16-inch laptop chamber and side magnetic water bottle expansion pocket.',
    details: [
      '20 Liter capacity with clam-shell full zip opening',
      'Pass-through luggage trolley sleeve for travel',
      'Breathable molded EVA back panel with airflow channels',
      'Waterproof PU-coated YKK zippers'
    ],
    materials: 'Custom 900D Recycled Oxford Poly with matte weather-shield coating.'
  },
  {
    id: 'prod-14',
    name: 'Japanese Hinoki Wood Bath Stool',
    tagline: 'Naturally aromatic cypress wood hand-joined in Kiso Valley',
    price: 130,
    category: 'Objects & Home',
    tags: ['Hinoki', 'Bathroom', 'Natural Wood'],
    rating: 5.0,
    reviewsCount: 27,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Natural Hinoki Cypress', hex: '#E7DFCF' }
    ],
    description: 'Constructed using traditional mortise and tenon joinery without screws or nails. Hinoki wood naturally releases an intoxicating forest aroma when wet.',
    details: [
      'Antimicrobial and naturally mold-resistant cypress',
      'Smooth hand-planed curved seat surface',
      'Compact footprint ideal for shower or dressing alcoves',
      'Ages into a rich silvery patina with age'
    ],
    materials: '100% Sustainably Harvested Japanese Hinoki (Cypress).'
  },
  {
    id: 'prod-15',
    name: 'Tailored Pleated Trousers',
    tagline: 'Worsted wool blend with relaxed taper and side adjusters',
    price: 160,
    category: 'Apparel',
    tags: ['Tailored', 'Smart Casual', 'Wool Blend'],
    rating: 4.7,
    reviewsCount: 54,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ash Grey', hex: '#63656A' },
      { name: 'Midnight Navy', hex: '#1D2430' },
      { name: 'Chocolate Brown', hex: '#3E342B' }
    ],
    sizes: ['30', '32', '34', '36'],
    description: 'Modern double-pleated dress trousers engineered for all-day comfort. Features hidden elastic side adjusters for a custom belt-free fit.',
    details: [
      'Single break hem tailored with 4cm turn-up cuff',
      'Crease-resistant 280 GSM wool blend fabric',
      'Slanted deep hand pockets and rear welt pockets',
      'Interior curtain waistband construction'
    ],
    materials: '60% Worsted Wool, 38% Recycled Poly, 2% Elastane.'
  },
  {
    id: 'prod-16',
    name: 'Solid Aluminum MagSafe Charging Stand',
    tagline: 'Beveled bead-blasted base with weighted micro-suction grip',
    price: 65,
    category: 'Tech & Audio',
    tags: ['Workspace', 'Aluminum', 'MagSafe'],
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Space Silver', hex: '#E0E0E3' },
      { name: 'Matte Slate', hex: '#333539' }
    ],
    description: 'Holds your smartphone at the optimal 60-degree viewing angle for StandBy mode and FaceTime calls. Heavy 450g CNC base stays planted when grabbing your device.',
    details: [
      'Precision cut from a solid 6063 aluminum block',
      'Internal cable channel route for clean desk aesthetics',
      'Protective soft silicone ring prevents phone scratches',
      'Micro-suction base technology locks to wood or glass'
    ],
    materials: 'Solid Bead-Blasted Aluminum, Soft-Touch Silicone.'
  }
];

export const CATEGORIES = [
  'All',
  'Apparel',
  'Everyday Carry',
  'Tech & Audio',
  'Objects & Home',
  'Footwear'
] as const;

export const PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  'WELCOME10': { discountPercent: 10, description: '10% off your first order' },
  'MINIMAL20': { discountPercent: 20, description: '20% off modern essentials' },
  'FREESHIP': { discountPercent: 0, description: 'Free Express Shipping' }
};
