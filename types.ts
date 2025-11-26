
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'website' | 'dashboard' | 'photo' | 'video';
  imageUrl: string;
  description: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  timestamp: any;
}
