import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

export const EmailTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Follow-up Meeting',
      subject: 'Follow-up: {{meeting_topic}} Discussion',
      content: 'Dear {{name}},\n\nThank you for your time today discussing {{meeting_topic}}...'
    },
    // Add more template examples
  ]);

  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [showNewTemplate, setShowNewTemplate] = useState(false);

  const handleSaveTemplate = (template: EmailTemplate) => {
    if (editingTemplate) {
      setTemplates(templates.map(t => 
        t.id === template.id ? template : t
      ));
    } else {
      setTemplates([...templates, { ...template, id: crypto.randomUUID() }]);
    }
    setEditingTemplate(null);
    setShowNewTemplate(false);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const TemplateForm: React.FC<{
    template?: EmailTemplate;
    onSave: (template: EmailTemplate) => void;
    onCancel: () => void;
  }> = ({ template, onSave, onCancel }) => {
    const [name, setName] = useState(template?.name || '');
    const [subject, setSubject] = useState(template?.subject || '');
    const [content, setContent] = useState(template?.content || '');

    return (
      <div className="space-y-4 p-4 bg-dark-800 rounded-lg">
        <Input
          placeholder="Template Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Subject Line"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="w-full h-40 px-3 py-2 text-sm rounded-md bg-dark-900 border border-dark-700 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Email Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Save size={16} />}
            onClick={() => onSave({
              id: template?.id || '',
              name,
              subject,
              content
            })}
            disabled={!name || !subject || !content}
          >
            Save Template
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Email Templates</CardTitle>
          <Button
            variant="outline"
            size="sm"
            icon={<Plus size={16} />}
            onClick={() => setShowNewTemplate(true)}
          >
            New Template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {showNewTemplate && (
            <TemplateForm
              onSave={handleSaveTemplate}
              onCancel={() => setShowNewTemplate(false)}
            />
          )}

          {templates.map(template => (
            <div
              key={template.id}
              className="p-4 border border-dark-800 rounded-lg hover:bg-dark-800/50 transition-colors"
            >
              {editingTemplate?.id === template.id ? (
                <TemplateForm
                  template={template}
                  onSave={handleSaveTemplate}
                  onCancel={() => setEditingTemplate(null)}
                />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">{template.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit2 size={16} />}
                        onClick={() => setEditingTemplate(template)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-500 hover:text-red-400"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-dark-400">Subject:</p>
                    <p className="text-sm text-white">{template.subject}</p>
                    
                    <p className="text-sm text-dark-400 mt-4">Content:</p>
                    <p className="text-sm text-white whitespace-pre-wrap">
                      {template.content}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};