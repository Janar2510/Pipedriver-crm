import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useCRM } from '../../context/CRMContext';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

export const TasksOverview: React.FC = () => {
  const { tasks } = useCRM();
  
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Filter tasks by completion status
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  
  // Filter tasks by due date
  const overdueTasks = pendingTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  });
  
  const todayTasks = pendingTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  });
  
  const tomorrowTasks = pendingTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === tomorrow.getTime();
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-red-600 mb-2">
              <Clock size={18} />
              <h3 className="font-medium">Overdue ({overdueTasks.length})</h3>
            </div>
            {overdueTasks.length > 0 ? (
              <ul className="space-y-2">
                {overdueTasks.slice(0, 3).map(task => (
                  <li key={task.id} className="flex items-start p-2 bg-red-50 rounded-md">
                    <div className="w-full">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{task.title}</span>
                        <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">{task.description}</p>
                    </div>
                  </li>
                ))}
                {overdueTasks.length > 3 && (
                  <li className="text-xs text-center text-blue-600">
                    +{overdueTasks.length - 3} more overdue tasks
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No overdue tasks</p>
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-2 text-amber-600 mb-2">
              <Calendar size={18} />
              <h3 className="font-medium">Today ({todayTasks.length})</h3>
            </div>
            {todayTasks.length > 0 ? (
              <ul className="space-y-2">
                {todayTasks.slice(0, 3).map(task => (
                  <li key={task.id} className="flex items-start p-2 bg-amber-50 rounded-md">
                    <div className="w-full">
                      <span className="font-medium">{task.title}</span>
                      <p className="text-xs text-gray-500 mt-1 truncate">{task.description}</p>
                    </div>
                  </li>
                ))}
                {todayTasks.length > 3 && (
                  <li className="text-xs text-center text-blue-600">
                    +{todayTasks.length - 3} more tasks for today
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No tasks for today</p>
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <CheckCircle size={18} />
              <h3 className="font-medium">Completed ({completedTasks.length})</h3>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-600" 
                style={{ 
                  width: `${(completedTasks.length / tasks.length) * 100}%` 
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {completedTasks.length} of {tasks.length} tasks completed
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};