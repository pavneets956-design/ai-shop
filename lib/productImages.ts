// Product image mappings - specific images for each product
export const productImages: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&auto=format", // AI Receptionist - Professional receptionist woman
  "2": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&auto=format", // Content Creator - Writing/typing
  "3": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&auto=format", // Customer Support - Headset/support
  "4": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&auto=format", // Email Marketing - Email/computer
  "5": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&auto=format", // Social Media Scheduler - Social media
  "6": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop&auto=format", // Inventory Management - Warehouse
};

// Fallback images by category
export const categoryImages: Record<string, string[]> = {
  "Communication": [
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&auto=format",
  ],
  "Content": [
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&auto=format",
  ],
  "Support": [
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&auto=format",
  ],
  "Marketing": [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format",
  ],
  "E-commerce": [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop&auto=format",
  ],
};

