from marshmallow import Schema, fields, validates_schema, ValidationError
from datetime import datetime

class TaskSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    description = fields.Str()
    status = fields.Str(required=True)
    due_date = fields.DateTime()
    created_at = fields.DateTime(dump_only=True)

    @validates_schema
    def validate_due_date(self, data, **kwargs):
        """Validate due_date field"""
        if 'due_date' in data:
            due_date = data['due_date']
            if not isinstance(due_date, datetime):
                raise ValidationError("Due date must be a valid date/time")
