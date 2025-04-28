import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Contact, Deal, Task, Activity } from '../types';
import { initialContacts, initialDeals, initialTasks, initialActivities } from '../data/initialData';

type CRMContextType = {
  contacts: Contact[];
  deals: Deal[];
  tasks: Task[];
  activities: Activity[];
  defaultCurrency: string;
  setDefaultCurrency: (currency: string) => void;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => string;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt'>) => string;
  updateDeal: (deal: Deal) => void;
  deleteDeal: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => string;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => string;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  getContactById: (id: string) => Contact | undefined;
  getDealById: (id: string) => Deal | undefined;
  getTasksByRelatedId: (id: string) => Task[];
  getActivitiesByRelatedId: (id: string) => Activity[];
};

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState('EUR');

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedContacts = localStorage.getItem('crm-contacts');
    const storedDeals = localStorage.getItem('crm-deals');
    const storedTasks = localStorage.getItem('crm-tasks');
    const storedActivities = localStorage.getItem('crm-activities');
    const storedCurrency = localStorage.getItem('crm-default-currency');

    setContacts(storedContacts ? JSON.parse(storedContacts) : initialContacts);
    setDeals(storedDeals ? JSON.parse(storedDeals) : initialDeals);
    setTasks(storedTasks ? JSON.parse(storedTasks) : initialTasks);
    setActivities(storedActivities ? JSON.parse(storedActivities) : initialActivities);
    if (storedCurrency) setDefaultCurrency(storedCurrency);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('crm-contacts', JSON.stringify(contacts));
    localStorage.setItem('crm-deals', JSON.stringify(deals));
    localStorage.setItem('crm-tasks', JSON.stringify(tasks));
    localStorage.setItem('crm-activities', JSON.stringify(activities));
    localStorage.setItem('crm-default-currency', defaultCurrency);
  }, [contacts, deals, tasks, activities, defaultCurrency]);

  const addContact = (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    const id = uuidv4();
    const newContact = { 
      ...contact, 
      id, 
      createdAt: new Date().toISOString() 
    };
    setContacts([...contacts, newContact]);
    return id;
  };

  const updateContact = (updatedContact: Contact) => {
    setContacts(contacts.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    // Also delete related deals, tasks, and activities
    setDeals(deals.filter(deal => deal.contactId !== id));
    setTasks(tasks.filter(task => !(task.relatedToType === 'contact' && task.relatedTo === id)));
    setActivities(activities.filter(activity => !(activity.relatedToType === 'contact' && activity.relatedTo === id)));
  };

  const addDeal = (deal: Omit<Deal, 'id' | 'createdAt'>) => {
    const id = uuidv4();
    const newDeal = { 
      ...deal, 
      id, 
      createdAt: new Date().toISOString() 
    };
    setDeals([...deals, newDeal]);
    return id;
  };

  const updateDeal = (updatedDeal: Deal) => {
    setDeals(deals.map(deal => 
      deal.id === updatedDeal.id ? updatedDeal : deal
    ));
  };

  const deleteDeal = (id: string) => {
    setDeals(deals.filter(deal => deal.id !== id));
    // Also delete related tasks and activities
    setTasks(tasks.filter(task => !(task.relatedToType === 'deal' && task.relatedTo === id)));
    setActivities(activities.filter(activity => !(activity.relatedToType === 'deal' && activity.relatedTo === id)));
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const id = uuidv4();
    const newTask = { 
      ...task, 
      id, 
      createdAt: new Date().toISOString() 
    };
    setTasks([...tasks, newTask]);
    return id;
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addActivity = (activity: Omit<Activity, 'id' | 'createdAt'>) => {
    const id = uuidv4();
    const newActivity = { 
      ...activity, 
      id, 
      createdAt: new Date().toISOString() 
    };
    setActivities([...activities, newActivity]);
    return id;
  };

  const updateActivity = (updatedActivity: Activity) => {
    setActivities(activities.map(activity => 
      activity.id === updatedActivity.id ? updatedActivity : activity
    ));
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const getContactById = (id: string) => {
    return contacts.find(contact => contact.id === id);
  };

  const getDealById = (id: string) => {
    return deals.find(deal => deal.id === id);
  };

  const getTasksByRelatedId = (id: string) => {
    return tasks.filter(task => task.relatedTo === id);
  };

  const getActivitiesByRelatedId = (id: string) => {
    return activities.filter(activity => activity.relatedTo === id);
  };

  const value = {
    contacts,
    deals,
    tasks,
    activities,
    defaultCurrency,
    setDefaultCurrency,
    addContact,
    updateContact,
    deleteContact,
    addDeal,
    updateDeal,
    deleteDeal,
    addTask,
    updateTask,
    deleteTask,
    addActivity,
    updateActivity,
    deleteActivity,
    getContactById,
    getDealById,
    getTasksByRelatedId,
    getActivitiesByRelatedId,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};