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
  Shapes,
} from "lucide-react";

export const categories = [
  {
    id: "home-services",
    name: "Home Services",
    description: "Expert solutions for all your home maintenance needs",
    icon: Home,
    color: "bg-blue-500",
    services: [
      {
        id: "electrician",
        name: "Electrician",
        description: "Electrical repairs, installations & wiring",
        icon: Zap,
        categoryId: "home-services",
      },
      {
        id: "plumber",
        name: "Plumber",
        description: "Plumbing repairs, pipe fixing & installations",
        icon: Droplets,
        categoryId: "home-services",
      },
      {
        id: "carpenter",
        name: "Carpenter",
        description: "Furniture repairs, woodwork & installations",
        icon: Hammer,
        categoryId: "home-services",
      },
      {
        id: "painter",
        name: "Painter",
        description: "Interior & exterior painting services",
        icon: Paintbrush,
        categoryId: "home-services",
      },
    ],
  },
  {
    id: "appliance-repair",
    name: "Appliance & Repair",
    description: "Professional repair for all home appliances",
    icon: Wrench,
    color: "bg-orange-500",
    services: [
      {
        id: "ac-repair",
        name: "AC Repair",
        description: "AC servicing, gas filling & repairs",
        icon: Wind,
        categoryId: "appliance-repair",
      },
      {
        id: "refrigerator-repair",
        name: "Refrigerator Repair",
        description: "Fridge repairs & maintenance",
        icon: ThermometerSnowflake,
        categoryId: "appliance-repair",
      },
      {
        id: "washing-machine-repair",
        name: "Washing Machine Repair",
        description: "Washing machine servicing & repairs",
        icon: WashingMachine,
        categoryId: "appliance-repair",
      },
      {
        id: "tv-repair",
        name: "TV Repair",
        description: "Television repairs & installations",
        icon: Tv,
        categoryId: "appliance-repair",
      },
      {
        id: "ro-service",
        name: "RO Water Purifier Service",
        description: "RO servicing, filter change & repairs",
        icon: GlassWater,
        categoryId: "appliance-repair",
      },
    ],
  },
  {
    id: "vehicle-services",
    name: "Vehicle Services",
    description: "Complete vehicle care and maintenance",
    icon: Car,
    color: "bg-green-500",
    services: [
      {
        id: "car-repair",
        name: "Car Repair",
        description: "Car mechanic services & repairs",
        icon: Car,
        categoryId: "vehicle-services",
      },
      {
        id: "bike-repair",
        name: "Bike Repair",
        description: "Bike servicing & maintenance",
        icon: Bike,
        categoryId: "vehicle-services",
      },
      {
        id: "mechanic-on-call",
        name: "Mechanic on Call",
        description: "Doorstep vehicle assistance",
        icon: Phone,
        categoryId: "vehicle-services",
      },
      {
        id: "vehicle-servicing",
        name: "Vehicle Servicing",
        description: "Complete vehicle servicing",
        icon: Settings,
        categoryId: "vehicle-services",
      },
    ],
  },
  {
    id: "event-services",
    name: "Event & Utility",
    description: "Make your events memorable",
    icon: PartyPopper,
    color: "bg-purple-500",
    services: [
      {
        id: "catering",
        name: "Catering Services",
        description: "Food catering for all occasions",
        icon: UtensilsCrossed,
        categoryId: "event-services",
      },
      {
        id: "event-setup",
        name: "Event Setup",
        description: "Event planning & decoration",
        icon: PartyPopper,
        categoryId: "event-services",
      },
      {
        id: "tent-lighting",
        name: "Tent & Lighting",
        description: "Tent setup & lighting arrangements",
        icon: Tent,
        categoryId: "event-services",
      },
    ],
  },
  {
    id: "civil-services",
    name: "Civil & General",
    description: "Construction and civil work services",
    icon: HardHat,
    color: "bg-amber-500",
    services: [
      {
        id: "civil-maintenance",
        name: "Civil Maintenance",
        description: "Building repairs & maintenance",
        icon: Building2,
        categoryId: "civil-services",
      },
      {
        id: "mason-work",
        name: "Mason Work",
        description: "Masonry & brick work services",
        icon: Layers,
        categoryId: "civil-services",
      },
      {
        id: "welding",
        name: "Welding",
        description: "Welding & metal work",
        icon: Flame,
        categoryId: "civil-services",
      },
      {
        id: "fabrication",
        name: "Fabrication",
        description: "Metal fabrication services",
        icon: Shapes,
        categoryId: "civil-services",
      },
    ],
  },
];

export const vendors = [
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
    description:
      "Expert electrical services for residential and commercial properties. Specialized in smart home installations.",
    images: [],
    specializations: ["Smart Home", "Industrial Wiring", "Emergency Services"],
    priceRange: "₹200 - ₹2000",
  },
  // (vendors list continues unchanged — exactly same data)
];

export const reviews = [
  {
    id: "r1",
    vendorId: "v1",
    customerId: "c1",
    customerName: "Rahul S.",
    rating: 5,
    comment:
      "Excellent service! Fixed my electrical issues quickly and professionally. Highly recommended.",
    createdAt: "2024-01-15",
  },
  // (reviews continue unchanged)
];

// Helper functions
export const getServiceById = (serviceId) => {
  for (const category of categories) {
    const service = category.services.find((s) => s.id === serviceId);
    if (service) return service;
  }
  return undefined;
};

export const getCategoryById = (categoryId) => {
  return categories.find((c) => c.id === categoryId);
};

export const getVendorsByService = (serviceId) => {
  return vendors.filter((v) => v.serviceIds.includes(serviceId));
};

export const getVendorById = (vendorId) => {
  return vendors.find((v) => v.id === vendorId);
};

export const getReviewsByVendor = (vendorId) => {
  return reviews.filter((r) => r.vendorId === vendorId);
};

export const getAllServices = () => {
  return categories.flatMap((c) => c.services);
};

// Alias exports for UI components
export const Category = categories;
export const Service = getAllServices();
export const Review = reviews;
