import { 
  Home, 
  Wrench, 
  Car, 
  PartyPopper, 
  HardHat,
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  Wind,
  ThermometerSnowflake,
  WashingMachine,
  Tv,
  GlassWater,
  Bike,
  Phone,
  Settings,
  UtensilsCrossed,
  Tent,
  Lightbulb,
  Building2,
  Layers,
  Flame,
  Shapes
} from "lucide-react";

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  services: Service[];
};

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  categoryId: string;
};

export type VendorShop = {
  id: string;
  name: string;
  serviceIds: string[];
  rating: number;
  reviewCount: number;
  location: string;
  distance: string;
  experience: string;
  isAvailable: boolean;
  phone: string;
  description: string;
  images: string[];
  specializations: string[];
  priceRange: string;
};

export type ServiceRequest = {
  id: string;
  customerId: string;
  vendorId: string;
  serviceId: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  location: string;
  isUrgent: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: string;
  vendorId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export const categories: Category[] = [
  {
    id: "home-services",
    name: "Home Services",
    description: "Expert solutions for all your home maintenance needs",
    icon: Home,
    color: "bg-blue-500",
    services: [
      { id: "electrician", name: "Electrician", description: "Electrical repairs, installations & wiring", icon: Zap, categoryId: "home-services" },
      { id: "plumber", name: "Plumber", description: "Plumbing repairs, pipe fixing & installations", icon: Droplets, categoryId: "home-services" },
      { id: "carpenter", name: "Carpenter", description: "Furniture repairs, woodwork & installations", icon: Hammer, categoryId: "home-services" },
      { id: "painter", name: "Painter", description: "Interior & exterior painting services", icon: Paintbrush, categoryId: "home-services" },
    ],
  },
  {
    id: "appliance-repair",
    name: "Appliance & Repair",
    description: "Professional repair for all home appliances",
    icon: Wrench,
    color: "bg-orange-500",
    services: [
      { id: "ac-repair", name: "AC Repair", description: "AC servicing, gas filling & repairs", icon: Wind, categoryId: "appliance-repair" },
      { id: "refrigerator-repair", name: "Refrigerator Repair", description: "Fridge repairs & maintenance", icon: ThermometerSnowflake, categoryId: "appliance-repair" },
      { id: "washing-machine-repair", name: "Washing Machine Repair", description: "Washing machine servicing & repairs", icon: WashingMachine, categoryId: "appliance-repair" },
      { id: "tv-repair", name: "TV Repair", description: "Television repairs & installations", icon: Tv, categoryId: "appliance-repair" },
      { id: "ro-service", name: "RO Water Purifier Service", description: "RO servicing, filter change & repairs", icon: GlassWater, categoryId: "appliance-repair" },
    ],
  },
  {
    id: "vehicle-services",
    name: "Vehicle Services",
    description: "Complete vehicle care and maintenance",
    icon: Car,
    color: "bg-green-500",
    services: [
      { id: "car-repair", name: "Car Repair", description: "Car mechanic services & repairs", icon: Car, categoryId: "vehicle-services" },
      { id: "bike-repair", name: "Bike Repair", description: "Bike servicing & maintenance", icon: Bike, categoryId: "vehicle-services" },
      { id: "mechanic-on-call", name: "Mechanic on Call", description: "Doorstep vehicle assistance", icon: Phone, categoryId: "vehicle-services" },
      { id: "vehicle-servicing", name: "Vehicle Servicing", description: "Complete vehicle servicing", icon: Settings, categoryId: "vehicle-services" },
    ],
  },
  {
    id: "event-services",
    name: "Event & Utility",
    description: "Make your events memorable",
    icon: PartyPopper,
    color: "bg-purple-500",
    services: [
      { id: "catering", name: "Catering Services", description: "Food catering for all occasions", icon: UtensilsCrossed, categoryId: "event-services" },
      { id: "event-setup", name: "Event Setup", description: "Event planning & decoration", icon: PartyPopper, categoryId: "event-services" },
      { id: "tent-lighting", name: "Tent & Lighting", description: "Tent setup & lighting arrangements", icon: Tent, categoryId: "event-services" },
    ],
  },
  {
    id: "civil-services",
    name: "Civil & General",
    description: "Construction and civil work services",
    icon: HardHat,
    color: "bg-amber-500",
    services: [
      { id: "civil-maintenance", name: "Civil Maintenance", description: "Building repairs & maintenance", icon: Building2, categoryId: "civil-services" },
      { id: "mason-work", name: "Mason Work", description: "Masonry & brick work services", icon: Layers, categoryId: "civil-services" },
      { id: "welding", name: "Welding", description: "Welding & metal work", icon: Flame, categoryId: "civil-services" },
      { id: "fabrication", name: "Fabrication", description: "Metal fabrication services", icon: Shapes, categoryId: "civil-services" },
    ],
  },
];

export const vendors: VendorShop[] = [
  // Electricians
  {
    id: "v1",
    name: "PowerFix Electricals",
    serviceIds: ["electrician"],
    rating: 4.8,
    reviewCount: 156,
    location: "Sector 15, Cityville",
    distance: "1.2 km",
    experience: "12 years",
    isAvailable: true,
    phone: "+91 98765 43210",
    description: "Expert electrical services for residential and commercial properties. Specialized in smart home installations.",
    images: [],
    specializations: ["Smart Home", "Industrial Wiring", "Emergency Services"],
    priceRange: "₹200 - ₹2000",
  },
  {
    id: "v2",
    name: "Bright Spark Electric",
    serviceIds: ["electrician"],
    rating: 4.5,
    reviewCount: 89,
    location: "Main Market, Cityville",
    distance: "2.5 km",
    experience: "8 years",
    isAvailable: true,
    phone: "+91 98765 43211",
    description: "Reliable electrical solutions with 24/7 emergency support. Licensed and insured professionals.",
    images: [],
    specializations: ["Residential", "Emergency Repairs", "Installations"],
    priceRange: "₹150 - ₹1500",
  },
  {
    id: "v3",
    name: "Elite Electricians",
    serviceIds: ["electrician"],
    rating: 4.9,
    reviewCount: 234,
    location: "Tech Park Road, Cityville",
    distance: "3.1 km",
    experience: "15 years",
    isAvailable: false,
    phone: "+91 98765 43212",
    description: "Premium electrical services with focus on quality and safety. Expertise in modern electrical systems.",
    images: [],
    specializations: ["Commercial", "Smart Systems", "Safety Audits"],
    priceRange: "₹300 - ₹3000",
  },
  // Plumbers
  {
    id: "v4",
    name: "AquaFlow Plumbing",
    serviceIds: ["plumber"],
    rating: 4.7,
    reviewCount: 112,
    location: "Civil Lines, Cityville",
    distance: "1.8 km",
    experience: "10 years",
    isAvailable: true,
    phone: "+91 98765 43213",
    description: "Complete plumbing solutions from leak repairs to new installations. Quick response time guaranteed.",
    images: [],
    specializations: ["Leak Detection", "Pipe Installation", "Bathroom Fitting"],
    priceRange: "₹200 - ₹2500",
  },
  {
    id: "v5",
    name: "PipeMaster Services",
    serviceIds: ["plumber"],
    rating: 4.6,
    reviewCount: 78,
    location: "Industrial Area, Cityville",
    distance: "4.2 km",
    experience: "7 years",
    isAvailable: true,
    phone: "+91 98765 43214",
    description: "Professional plumbing services for homes and offices. Specialized in drainage solutions.",
    images: [],
    specializations: ["Drainage", "Water Heaters", "Sanitary Work"],
    priceRange: "₹180 - ₹2000",
  },
  // Carpenters
  {
    id: "v6",
    name: "WoodCraft Studio",
    serviceIds: ["carpenter"],
    rating: 4.9,
    reviewCount: 189,
    location: "Furniture Market, Cityville",
    distance: "2.0 km",
    experience: "20 years",
    isAvailable: true,
    phone: "+91 98765 43215",
    description: "Master craftsmen creating beautiful custom furniture and woodwork. Traditional and modern designs.",
    images: [],
    specializations: ["Custom Furniture", "Modular Kitchen", "Wardrobe"],
    priceRange: "₹500 - ₹50000",
  },
  // Painters
  {
    id: "v7",
    name: "ColorSplash Painters",
    serviceIds: ["painter"],
    rating: 4.7,
    reviewCount: 145,
    location: "New Colony, Cityville",
    distance: "1.5 km",
    experience: "14 years",
    isAvailable: true,
    phone: "+91 98765 43216",
    description: "Transform your space with our professional painting services. Interior, exterior, and texture specialists.",
    images: [],
    specializations: ["Interior", "Exterior", "Texture Painting"],
    priceRange: "₹15 - ₹50 per sqft",
  },
  // AC Repair
  {
    id: "v8",
    name: "CoolTech AC Services",
    serviceIds: ["ac-repair"],
    rating: 4.8,
    reviewCount: 203,
    location: "Electronics Market, Cityville",
    distance: "2.3 km",
    experience: "11 years",
    isAvailable: true,
    phone: "+91 98765 43217",
    description: "Expert AC repair and maintenance for all brands. Same-day service available.",
    images: [],
    specializations: ["All Brands", "Gas Filling", "Installation"],
    priceRange: "₹300 - ₹3000",
  },
  // Car Repair
  {
    id: "v9",
    name: "AutoCare Garage",
    serviceIds: ["car-repair", "vehicle-servicing"],
    rating: 4.6,
    reviewCount: 167,
    location: "Highway Road, Cityville",
    distance: "3.5 km",
    experience: "18 years",
    isAvailable: true,
    phone: "+91 98765 43218",
    description: "Complete car care under one roof. From regular servicing to major repairs.",
    images: [],
    specializations: ["Engine Repair", "Body Work", "Servicing"],
    priceRange: "₹500 - ₹25000",
  },
  // Catering
  {
    id: "v10",
    name: "Royal Feast Caterers",
    serviceIds: ["catering"],
    rating: 4.9,
    reviewCount: 278,
    location: "Food Street, Cityville",
    distance: "2.8 km",
    experience: "22 years",
    isAvailable: true,
    phone: "+91 98765 43219",
    description: "Premium catering services for weddings, parties, and corporate events. Multi-cuisine specialists.",
    images: [],
    specializations: ["Weddings", "Corporate", "Multi-Cuisine"],
    priceRange: "₹300 - ₹1500 per plate",
  },
  // Civil Maintenance
  {
    id: "v11",
    name: "BuildRight Contractors",
    serviceIds: ["civil-maintenance", "mason-work"],
    rating: 4.5,
    reviewCount: 92,
    location: "Construction Zone, Cityville",
    distance: "4.0 km",
    experience: "25 years",
    isAvailable: true,
    phone: "+91 98765 43220",
    description: "Comprehensive civil construction and maintenance services. Quality workmanship guaranteed.",
    images: [],
    specializations: ["Renovation", "Construction", "Repairs"],
    priceRange: "₹500 - ₹100000",
  },
  // Additional vendors for variety
  {
    id: "v12",
    name: "QuickFix Appliances",
    serviceIds: ["refrigerator-repair", "washing-machine-repair", "ro-service"],
    rating: 4.4,
    reviewCount: 134,
    location: "Service Center Road, Cityville",
    distance: "1.9 km",
    experience: "9 years",
    isAvailable: true,
    phone: "+91 98765 43221",
    description: "One-stop solution for all appliance repairs. Genuine parts and warranty on repairs.",
    images: [],
    specializations: ["Multi-Brand", "Quick Service", "Genuine Parts"],
    priceRange: "₹200 - ₹5000",
  },
  {
    id: "v13",
    name: "TwoWheel Mechanics",
    serviceIds: ["bike-repair", "mechanic-on-call"],
    rating: 4.7,
    reviewCount: 198,
    location: "Auto Stand, Cityville",
    distance: "0.8 km",
    experience: "12 years",
    isAvailable: true,
    phone: "+91 98765 43222",
    description: "Specialized bike repair and maintenance. Doorstep service available.",
    images: [],
    specializations: ["All Bikes", "Roadside Assistance", "Servicing"],
    priceRange: "₹100 - ₹5000",
  },
  {
    id: "v14",
    name: "Celebrations Event Co.",
    serviceIds: ["event-setup", "tent-lighting"],
    rating: 4.8,
    reviewCount: 156,
    location: "Event Plaza, Cityville",
    distance: "3.2 km",
    experience: "16 years",
    isAvailable: true,
    phone: "+91 98765 43223",
    description: "Creating memorable events with stunning setups. From intimate gatherings to grand celebrations.",
    images: [],
    specializations: ["Weddings", "Corporate Events", "Birthday Parties"],
    priceRange: "₹10000 - ₹500000",
  },
  {
    id: "v15",
    name: "MetalWorks Fabrication",
    serviceIds: ["welding", "fabrication"],
    rating: 4.6,
    reviewCount: 87,
    location: "Industrial Estate, Cityville",
    distance: "5.1 km",
    experience: "20 years",
    isAvailable: true,
    phone: "+91 98765 43224",
    description: "Custom metal fabrication and welding services. Industrial and residential projects.",
    images: [],
    specializations: ["Gates", "Grills", "Custom Fabrication"],
    priceRange: "₹500 - ₹50000",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    vendorId: "v1",
    customerId: "c1",
    customerName: "Rahul S.",
    rating: 5,
    comment: "Excellent service! Fixed my electrical issues quickly and professionally. Highly recommended.",
    createdAt: "2024-01-15",
  },
  {
    id: "r2",
    vendorId: "v1",
    customerId: "c2",
    customerName: "Priya M.",
    rating: 4,
    comment: "Good work, arrived on time. Slightly expensive but quality work.",
    createdAt: "2024-01-10",
  },
  {
    id: "r3",
    vendorId: "v4",
    customerId: "c3",
    customerName: "Amit K.",
    rating: 5,
    comment: "Best plumber in the area. Fixed a major leak in no time. Very reasonable pricing.",
    createdAt: "2024-01-12",
  },
  {
    id: "r4",
    vendorId: "v8",
    customerId: "c4",
    customerName: "Sneha R.",
    rating: 5,
    comment: "AC is working like new! Great service and transparent pricing.",
    createdAt: "2024-01-08",
  },
  {
    id: "r5",
    vendorId: "v10",
    customerId: "c5",
    customerName: "Vikram P.",
    rating: 5,
    comment: "Amazing food and service for my daughter's wedding. Everyone loved it!",
    createdAt: "2024-01-05",
  },
];

// Helper functions
export const getServiceById = (serviceId: string): Service | undefined => {
  for (const category of categories) {
    const service = category.services.find(s => s.id === serviceId);
    if (service) return service;
  }
  return undefined;
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(c => c.id === categoryId);
};

export const getVendorsByService = (serviceId: string): VendorShop[] => {
  return vendors.filter(v => v.serviceIds.includes(serviceId));
};

export const getVendorById = (vendorId: string): VendorShop | undefined => {
  return vendors.find(v => v.id === vendorId);
};

export const getReviewsByVendor = (vendorId: string): Review[] => {
  return reviews.filter(r => r.vendorId === vendorId);
};

export const getAllServices = (): Service[] => {
  return categories.flatMap(c => c.services);
};
