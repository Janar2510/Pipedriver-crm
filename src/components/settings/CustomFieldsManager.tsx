import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type FieldType = 'text' | 'number' | 'date' | 'select' | 'checkbox';
type EntityType = 'contact' | 'deal' | 'organization';

interface CustomField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  entity: EntityType;
}

const FieldTypeOptions: Record<FieldType, string> = {
  text: 'Text',
  number: 'Number',
  date: 'Date',
  select: 'Dropdown',
  checkbox: 'Checkbox'
};

const EntityTypeOptions: Record<EntityType, string> = {
  contact: 'Contact',
  deal: 'Deal',
  organization: 'Organization'
};

const CustomFieldItem: React.FC<{
  field: CustomField;
  onDelete: () => void;
  onUpdate: (field: CustomField) => void;
}> = ({ field, onDelete, onUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg"
    >
      <div {...attributes} {...listeners} className="cursor-move">
        <GripVertical size={20} className="text-dark-400" />
      </div>
      
      <div className="flex-1 grid grid-cols-4 gap-4">
        <Input
          value={field.name}
          onChange={(e) => onUpdate({ ...field, name: e.target.value })}
          placeholder="Field Name"
        />
        
        <select
          value={field.type}
          onChange={(e) => onUpdate({ ...field, type: e.target.value as FieldType })}
          className="bg-dark-900 border border-dark-700 rounded-md px-3 py-2 text-white"
        >
          {Object.entries(FieldTypeOptions).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        
        <select
          value={field.entity}
          onChange={(e) => onUpdate({ ...field, entity: e.target.value as EntityType })}
          className="bg-dark-900 border border-dark-700 rounded-md px-3 py-2 text-white"
        >
          {Object.entries(EntityTypeOptions).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        
        <div className="flex items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => onUpdate({ ...field, required: e.target.checked })}
              className="rounded border-dark-600 bg-dark-700 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-white">Required</span>
          </label>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        icon={<Trash2 size={16} />}
        className="text-red-500 hover:text-red-400"
      >
        Delete
      </Button>
    </div>
  );
};

export const CustomFieldsManager: React.FC = () => {
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<EntityType>('contact');

  const addField = () => {
    const newField: CustomField = {
      id: crypto.randomUUID(),
      name: '',
      type: 'text',
      required: false,
      entity: selectedEntity
    };
    setCustomFields([...customFields, newField]);
  };

  const updateField = (updatedField: CustomField) => {
    setCustomFields(fields =>
      fields.map(field =>
        field.id === updatedField.id ? updatedField : field
      )
    );
  };

  const deleteField = (fieldId: string) => {
    setCustomFields(fields => fields.filter(field => field.id !== fieldId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCustomFields(fields => {
      const oldIndex = fields.findIndex(f => f.id === active.id);
      const newIndex = fields.findIndex(f => f.id === over.id);

      const newFields = [...fields];
      const [movedField] = newFields.splice(oldIndex, 1);
      newFields.splice(newIndex, 0, movedField);

      return newFields;
    });
  };

  const filteredFields = customFields.filter(field => field.entity === selectedEntity);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Fields</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              {Object.entries(EntityTypeOptions).map(([value, label]) => (
                <Button
                  key={value}
                  variant={selectedEntity === value ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedEntity(value as EntityType)}
                >
                  {label}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={addField}
              icon={<Plus size={16} />}
            >
              Add Field
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 px-14 text-sm text-dark-400">
              <div>Field Name</div>
              <div>Type</div>
              <div>Entity</div>
              <div>Required</div>
            </div>

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredFields}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {filteredFields.map(field => (
                    <CustomFieldItem
                      key={field.id}
                      field={field}
                      onDelete={() => deleteField(field.id)}
                      onUpdate={updateField}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};