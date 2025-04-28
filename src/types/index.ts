import { z } from 'zod';

// Enhanced Contact Schema
export const ContactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  company: z.string(),
  position: z.string(),
  status: z.enum(['lead', 'customer', 'prospect']),
  tags: z.array(z.string()),
  notes: z.string(),
  lastContacted: z.string(),
  createdAt: z.string(),
  owner: z.string().optional(),
  customFields: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
  addresses: z.array(z.object({
    type: z.enum(['billing', 'shipping', 'other']),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string()
  })),
  socialProfiles: z.record(z.string(), z.string()),
  communicationPreferences: z.object({
    email: z.boolean(),
    phone: z.boolean(),
    sms: z.boolean()
  })
});

// Enhanced Deal Schema
export const DealSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
  currency: z.string().default('USD'),
  contactId: z.string(),
  stage: z.enum([
    'lead',
    'discovery',
    'proposal',
    'negotiation',
    'closed-won',
    'closed-lost'
  ]),
  priority: z.enum(['low', 'medium', 'high']),
  createdAt: z.string(),
  expectedCloseDate: z.string(),
  owner: z.string().optional(),
  probability: z.number().min(0).max(100),
  products: z.array(z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    discount: z.number()
  })),
  customFields: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
  lostReason: z.string().optional(),
  competitors: z.array(z.string()),
  documents: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    url: z.string(),
    createdAt: z.string()
  }))
});

// Enhanced Task Schema
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  relatedTo: z.string(),
  relatedToType: z.enum(['contact', 'deal']),
  dueDate: z.string(),
  completed: z.boolean(),
  createdAt: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  assignedTo: z.string().optional(),
  category: z.enum(['call', 'meeting', 'email', 'follow-up', 'other']),
  reminder: z.object({
    enabled: z.boolean(),
    time: z.string()
  }),
  recurring: z.object({
    enabled: z.boolean(),
    frequency: z.enum(['daily', 'weekly', 'monthly', 'custom']),
    interval: z.number(),
    endDate: z.string().optional()
  })
});

// Enhanced Activity Schema
export const ActivitySchema = z.object({
  id: z.string(),
  type: z.enum(['call', 'meeting', 'email', 'note']),
  description: z.string(),
  relatedTo: z.string(),
  relatedToType: z.enum(['contact', 'deal']),
  date: z.string(),
  createdAt: z.string(),
  duration: z.number().optional(),
  outcome: z.enum(['positive', 'negative', 'neutral']).optional(),
  participants: z.array(z.string()),
  location: z.string().optional(),
  attachments: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    url: z.string()
  }))
});

// Product Schema
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  code: z.string(),
  price: z.number(),
  currency: z.string(),
  unit: z.string(),
  active: z.boolean(),
  category: z.string(),
  tax: z.number(),
  createdAt: z.string(),
  customFields: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
});

// Organization Schema
export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  industry: z.string(),
  size: z.string(),
  revenue: z.number().optional(),
  website: z.string().optional(),
  addresses: z.array(z.object({
    type: z.enum(['main', 'billing', 'shipping']),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string()
  })),
  contacts: z.array(z.string()), // Contact IDs
  deals: z.array(z.string()), // Deal IDs
  createdAt: z.string(),
  customFields: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
});

// Pipeline Schema
export const PipelineSchema = z.object({
  id: z.string(),
  name: z.string(),
  stages: z.array(z.object({
    id: z.string(),
    name: z.string(),
    order: z.number(),
    probability: z.number()
  })),
  currency: z.string(),
  active: z.boolean(),
  createdAt: z.string()
});

// User Schema
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['admin', 'manager', 'user']),
  active: z.boolean(),
  createdAt: z.string(),
  lastLogin: z.string().optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    language: z.string(),
    notifications: z.object({
      email: z.boolean(),
      push: z.boolean(),
      desktop: z.boolean()
    })
  })
});

// Export types
export type Contact = z.infer<typeof ContactSchema>;
export type Deal = z.infer<typeof DealSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type Activity = z.infer<typeof ActivitySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type Pipeline = z.infer<typeof PipelineSchema>;
export type User = z.infer<typeof UserSchema>;