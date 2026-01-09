
import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Globe, 
  Mail, 
  FileEdit, 
  BarChart3, 
  Users,
  Link,
  Send,
  CheckCircle2
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'client_finder', label: 'Client Finder', icon: <Users size={20} /> },
  { id: 'site_discovery', label: 'Site Discovery', icon: <Globe size={20} /> },
  { id: 'outreach', label: 'Outreach Manager', icon: <Mail size={20} /> },
  { id: 'content_writer', label: 'Content Writer', icon: <FileEdit size={20} /> },
  { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
];

export const MOCK_CHART_DATA = [
  { name: 'Jan', links: 12, emails: 45 },
  { name: 'Feb', links: 19, emails: 52 },
  { name: 'Mar', links: 15, emails: 48 },
  { name: 'Apr', links: 22, emails: 61 },
  { name: 'May', links: 30, emails: 75 },
  { name: 'Jun', links: 28, emails: 82 },
];
