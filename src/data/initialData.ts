import { Contact, Deal, Task, Activity } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Generate current date in ISO format
const now = new Date().toISOString();
const yesterday = new Date(Date.now() - 86400000).toISOString();
const tomorrow = new Date(Date.now() + 86400000).toISOString();
const nextWeek = new Date(Date.now() + 604800000).toISOString();

export const initialContacts: Contact[] = [
  {
    id: uuidv4(),
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567',
    company: 'Acme Inc.',
    position: 'Marketing Director',
    status: 'customer',
    tags: ['marketing', 'enterprise'],
    notes: 'Met at the Digital Marketing Conference.',
    lastContacted: yesterday,
    createdAt: now,
  },
  {
    id: uuidv4(),
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(555) 987-6543',
    company: 'TechGlobe',
    position: 'CTO',
    status: 'prospect',
    tags: ['tech', 'decision-maker'],
    notes: 'Interested in our enterprise solution.',
    lastContacted: now,
    createdAt: yesterday,
  },
  {
    id: uuidv4(),
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '(555) 234-5678',
    company: 'StartUp Labs',
    position: 'CEO',
    status: 'lead',
    tags: ['startup', 'potential'],
    notes: 'Connected on LinkedIn. Wants to discuss options next week.',
    lastContacted: yesterday,
    createdAt: yesterday,
  },
];

export const initialDeals: Deal[] = [
  {
    id: uuidv4(),
    name: 'Acme Inc. Enterprise Package',
    value: 75000,
    contactId: initialContacts[0].id,
    stage: 'proposal',
    priority: 'high',
    createdAt: yesterday,
    expectedCloseDate: nextWeek,
  },
  {
    id: uuidv4(),
    name: 'TechGlobe Software Integration',
    value: 120000,
    contactId: initialContacts[1].id,
    stage: 'discovery',
    priority: 'medium',
    createdAt: now,
    expectedCloseDate: nextWeek,
  },
];

export const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Follow up with Sarah',
    description: 'Send proposal document and schedule a review call',
    relatedTo: initialContacts[0].id,
    relatedToType: 'contact',
    dueDate: tomorrow,
    completed: false,
    createdAt: yesterday,
  },
  {
    id: uuidv4(),
    title: 'Prepare technical demo',
    description: 'Create customized demo for TechGlobe team',
    relatedTo: initialDeals[1].id,
    relatedToType: 'deal',
    dueDate: nextWeek,
    completed: false,
    createdAt: now,
  },
];

export const initialActivities: Activity[] = [
  {
    id: uuidv4(),
    type: 'call',
    description: 'Discussed project scope and timeline',
    relatedTo: initialContacts[0].id,
    relatedToType: 'contact',
    date: yesterday,
    createdAt: yesterday,
  },
  {
    id: uuidv4(),
    type: 'email',
    description: 'Sent product information and pricing details',
    relatedTo: initialContacts[1].id,
    relatedToType: 'contact',
    date: now,
    createdAt: now,
  },
];