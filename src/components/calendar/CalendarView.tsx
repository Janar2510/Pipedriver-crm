import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

export const CalendarView: React.FC = () => {
  const { activities, tasks } = useCRM();

  const events = [
    ...activities.map(activity => ({
      id: activity.id,
      title: activity.description,
      start: activity.date,
      end: activity.date,
      backgroundColor: getActivityColor(activity.type),
      borderColor: getActivityColor(activity.type),
      extendedProps: {
        type: 'activity',
        activityType: activity.type,
      }
    })),
    ...tasks.filter(task => !task.completed).map(task => ({
      id: task.id,
      title: task.title,
      start: task.dueDate,
      backgroundColor: '#6046aa',
      borderColor: '#6046aa',
      extendedProps: {
        type: 'task',
      }
    }))
  ];

  function getActivityColor(type: string) {
    switch (type) {
      case 'call':
        return '#3b82f6';
      case 'meeting':
        return '#10b981';
      case 'email':
        return '#f59e0b';
      default:
        return '#6366f1';
    }
  }

  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Calendar</h1>
          <p className="text-dark-400">Schedule and manage your activities</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" icon={<Filter size={16} />}>
            Filter
          </Button>
          <Button variant="primary" icon={<Plus size={16} />}>
            Add Event
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            eventClick={(info) => {
              console.log('Event clicked:', info.event);
            }}
            height="auto"
            customButtons={{
              prev: {
                icon: 'chevron-left',
                click: () => {
                  const calendarApi = info.current?.getApi();
                  calendarApi?.prev();
                }
              },
              next: {
                icon: 'chevron-right',
                click: () => {
                  const calendarApi = info.current?.getApi();
                  calendarApi?.next();
                }
              }
            }}
            themeSystem="standard"
          />
        </div>
      </Card>
    </div>
  );
};