from mongoengine import Document, StringField

class Enrollment(Document):
    user_email = StringField(required=True)
    formation_id = StringField(required=True)
