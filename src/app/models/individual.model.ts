export interface Individual {
  id: number;
  name: string;
  location: { lat: number; lng: number };
  status: 'safe' | 'needs attention';
  lastUpdated: string;
}