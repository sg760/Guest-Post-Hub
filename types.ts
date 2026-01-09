
export interface Client {
  id: string;
  name: string;
  niche: string;
  website: string;
  trafficScore: number;
  spamRisk: 'Low' | 'Medium' | 'High';
  status: 'Lead' | 'Active' | 'Closed';
}

export interface Site {
  id: string;
  url: string;
  domainAuthority: number;
  niche: string;
  contactEmail?: string;
  status: 'To Contact' | 'Outreached' | 'Accepted' | 'Rejected';
}

export interface BacklinkReport {
  id: string;
  clientName: string;
  targetUrl: string;
  liveUrl: string;
  anchorText: string;
  status: 'Pending' | 'Live' | 'Failed';
  publishedDate: string;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  CLIENT_FINDER = 'client_finder',
  SITE_DISCOVERY = 'site_discovery',
  OUTREACH = 'outreach',
  CONTENT_WRITER = 'content_writer',
  REPORTS = 'reports'
}
