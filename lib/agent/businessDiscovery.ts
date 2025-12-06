// Local Business Discovery System
// Helps find and import local businesses for cold calling campaigns

export interface LocalBusiness {
  name: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  industry?: string;
  businessType?: string;
  website?: string;
  email?: string;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
}

export interface BusinessSearchParams {
  location: string; // City, state, or zip code
  industry?: string; // e.g., "restaurant", "dentist", "plumber"
  radius?: number; // in miles
  limit?: number;
}

export class BusinessDiscovery {
  /**
   * Search for local businesses
   * In production, this would integrate with:
   * - Google Places API
   * - Yelp API
   * - Yellow Pages API
   * - Local business directories
   */
  async searchBusinesses(params: BusinessSearchParams): Promise<LocalBusiness[]> {
    // Mock implementation - in production, call actual APIs
    console.log(`Searching for businesses in ${params.location}...`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data based on search params
    const mockBusinesses: LocalBusiness[] = this.generateMockBusinesses(params);
    
    return mockBusinesses;
  }

  /**
   * Enrich business data with additional information
   */
  async enrichBusinessData(business: LocalBusiness): Promise<LocalBusiness> {
    // In production, this would:
    // - Look up business details from multiple sources
    // - Verify phone numbers
    // - Get business hours
    // - Get reviews and ratings
    // - Check if business is still active
    
    return {
      ...business,
      verified: true,
      rating: Math.random() * 2 + 3, // 3-5 stars
      reviewCount: Math.floor(Math.random() * 100) + 10,
    };
  }

  /**
   * Validate phone number format
   */
  validatePhoneNumber(phone: string): boolean {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    // US phone numbers should be 10 digits (or 11 with country code)
    return digits.length === 10 || (digits.length === 11 && digits[0] === '1');
  }

  /**
   * Format phone number to standard format
   */
  formatPhoneNumber(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11 && digits[0] === '1') {
      return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    return phone; // Return as-is if can't format
  }

  /**
   * Generate mock businesses for testing
   */
  private generateMockBusinesses(params: BusinessSearchParams): LocalBusiness[] {
    const industries = params.industry 
      ? [params.industry]
      : ["restaurant", "dentist", "plumber", "lawyer", "accountant", "real estate", "auto repair", "salon", "gym", "vet"];
    
    const locations = params.location.split(',').map(l => l.trim());
    const city = locations[0] || "Your City";
    const state = locations[1] || "ST";
    
    const businesses: LocalBusiness[] = [];
    const count = params.limit || 20;
    
    for (let i = 0; i < count; i++) {
      const industry = industries[Math.floor(Math.random() * industries.length)];
      const businessTypes: Record<string, string[]> = {
        restaurant: ["Italian Restaurant", "Pizza Place", "Cafe", "Mexican Restaurant", "Steakhouse"],
        dentist: ["Dental Office", "Orthodontist", "Oral Surgeon"],
        plumber: ["Plumbing Service", "Emergency Plumber", "Plumbing Contractor"],
        lawyer: ["Law Firm", "Attorney", "Legal Services"],
        accountant: ["Accounting Firm", "Tax Preparer", "Bookkeeping Service"],
        "real estate": ["Real Estate Agency", "Property Management", "Real Estate Broker"],
        "auto repair": ["Auto Shop", "Mechanic", "Car Repair"],
        salon: ["Hair Salon", "Nail Salon", "Beauty Salon"],
        gym: ["Fitness Center", "Gym", "Personal Training"],
        vet: ["Veterinary Clinic", "Animal Hospital", "Pet Care"],
      };
      
      const types = businessTypes[industry] || [industry];
      const businessType = types[Math.floor(Math.random() * types.length)];
      
      // Generate phone number
      const areaCode = Math.floor(Math.random() * 800) + 200; // 200-999
      const exchange = Math.floor(Math.random() * 800) + 200;
      const number = Math.floor(Math.random() * 10000);
      const phone = `+1 (${areaCode}) ${exchange}-${number.toString().padStart(4, '0')}`;
      
      businesses.push({
        name: `${businessType} ${i + 1}`,
        phone,
        address: `${Math.floor(Math.random() * 9999) + 1} Main St`,
        city,
        state,
        zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        industry,
        businessType,
        website: `https://www.${businessType.toLowerCase().replace(/\s+/g, '')}${i + 1}.com`,
        email: `info@${businessType.toLowerCase().replace(/\s+/g, '')}${i + 1}.com`,
        rating: Math.random() * 2 + 3,
        reviewCount: Math.floor(Math.random() * 100) + 10,
        verified: Math.random() > 0.3,
      });
    }
    
    return businesses;
  }

  /**
   * Import businesses from CSV file
   */
  async importFromCSV(csvContent: string): Promise<LocalBusiness[]> {
    const lines = csvContent.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    const businesses: LocalBusiness[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const business: Partial<LocalBusiness> = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        if (value) {
          switch (header) {
            case 'name':
            case 'business name':
            case 'company':
              business.name = value;
              break;
            case 'phone':
            case 'phone number':
            case 'telephone':
              business.phone = this.formatPhoneNumber(value);
              break;
            case 'address':
            case 'street':
              business.address = value;
              break;
            case 'city':
              business.city = value;
              break;
            case 'state':
              business.state = value;
              break;
            case 'zip':
            case 'zipcode':
            case 'postal code':
              business.zipCode = value;
              break;
            case 'industry':
            case 'category':
              business.industry = value;
              break;
            case 'type':
            case 'business type':
              business.businessType = value;
              break;
            case 'website':
            case 'url':
              business.website = value;
              break;
            case 'email':
              business.email = value;
              break;
          }
        }
      });
      
      if (business.name && business.phone) {
        businesses.push(business as LocalBusiness);
      }
    }
    
    return businesses;
  }
}

