import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Search, Plus, CheckCircle, Clock, ChevronDown, Filter } from 'lucide-react';

export const TasksList: React.FC = () => {
  const { tasks, contacts, deals, updateTask } = useCRM();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(false); // null = all, false = incomplete, true = completed
  
  // Filter tasks based on search query and completion status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCompletion = 
      filterCompleted === null || 
      task.completed === filterCompleted;
    
    return matchesSearch && matchesCompletion;
  });
  
  // Group tasks by due date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const overdueTasks = filteredTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today && !task.completed;
  });
  
  const todayTasks = filteredTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  });
  
  const tomorrowTasks = filteredTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === tomorrow.getTime();
  });
  
  const upcomingTasks = filteredTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate > tomorrow && dueDate <= nextWeek;
  });
  
  const laterTasks = filteredTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate > nextWeek;
  });
  
  const completedTasks = filteredTasks.filter(task => task.completed);
  
  const getRelatedEntityName = (task: typeof tasks[0]) => {
    if (task.relatedToType === 'contact') {
      const contact = contacts.find(c => c.id === task.relatedTo);
      return contact ? contact.name : 'Unknown Contact';
    } else {
      const deal = deals.find(d => d.id === task.relatedTo);
      return deal ? deal.name : 'Unknown Deal';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  const toggleTaskCompletion = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask({
        ...task,
        completed: !task.completed,
      });
    }
  };
  
  const TaskItem = ({ task }: { task: typeof tasks[0] }) => (
    <div className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
      <button 
        onClick={() => toggleTaskCompletion(task.id)}
        className={`flex-shrink-0 mt-0.5 ${task.completed ? 'text-green-500' : 'text-gray-400 hover:text-blue-500'}`}
      >
        {task.completed ? <CheckCircle size={20} /> : <div className="w-5 h-5 border-2 border-current rounded-full" />}
      </button>
      
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          <span className="text-xs text-gray-500">{formatDate(task.dueDate)}</span>
        </div>
        
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        
        <div className="mt-2 text-xs text-gray-500">
          Related to: {getRelatedEntityName(task)}
        </div>
      </div>
    </div>
  );
  
  const TaskGroup = ({ title, tasks, icon, className }: { 
    title: string; 
    tasks: typeof filteredTasks;
    icon: React.ReactNode;
    className?: string;
  }) => (
    <div className="mb-6">
      <div className={`flex items-center mb-3 ${className}`}>
        {icon}
        <h2 className="text-lg font-medium ml-2">{title}</h2>
        <span className="ml-2 text-sm text-gray-500">({tasks.length})</span>
      </div>
      
      {tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No tasks</p>
      )}
    </div>
  );
  
  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Tasks</h1>
        <Button variant="primary" icon={<Plus size={16} />}>
          Add Task
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                fullWidth
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={filterCompleted === null ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilterCompleted(null)}
              >
                All
              </Button>
              <Button
                variant={filterCompleted === false ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilterCompleted(false)}
              >
                Active
              </Button>
              <Button
                variant={filterCompleted === true ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilterCompleted(true)}
              >
                Completed
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<Filter size={16} />}
              >
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        {overdueTasks.length > 0 && (
          <TaskGroup 
            title="Overdue" 
            tasks={overdueTasks} 
            icon={<Clock size={20} className="text-red-500" />}
            className="text-red-600"
          />
        )}
        
        {todayTasks.length > 0 && (
          <TaskGroup 
            title="Today" 
            tasks={todayTasks} 
            icon={<Clock size={20} className="text-blue-500" />}
            className="text-blue-600"
          />
        )}
        
        {tomorrowTasks.length > 0 && (
          <TaskGroup 
            title="Tomorrow" 
            tasks={tomorrowTasks} 
            icon={<Clock size={20} className="text-teal-500" />}
            className="text-teal-600"
          />
        )}
        
        {upcomingTasks.length > 0 && (
          <TaskGroup 
            title="This Week" 
            tasks={upcomingTasks} 
            icon={<Clock size={20} className="text-amber-500" />}
            className="text-amber-600"
          />
        )}
        
        {laterTasks.length > 0 && (
          <TaskGroup 
            title="Later" 
            tasks={laterTasks} 
            icon={<Clock size={20} className="text-gray-500" />}
            className="text-gray-600"
          />
        )}
        
        {completedTasks.length > 0 && filterCompleted !== false && (
          <TaskGroup 
            title="Completed" 
            tasks={completedTasks} 
            icon={<CheckCircle size={20} className="text-green-500" />}
            className="text-green-600"
          />
        )}
        
        {filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-gray-400 mb-4">
              <CheckCircle size={48} />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks found</h3>
            <p className="text-gray-500 max-w-md mb-6">
              {searchQuery 
                ? "We couldn't find any tasks matching your search query. Try adjusting your filters."
                : filterCompleted === true
                  ? "You haven't completed any tasks yet."
                  : "Your task list is empty. Create a task to get started."}
            </p>
            <Button variant="primary" icon={<Plus size={16} />}>
              Create New Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};