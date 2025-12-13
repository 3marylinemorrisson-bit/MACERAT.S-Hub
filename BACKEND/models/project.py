from mongoengine import Document, StringField

class Project(Document):
    title = StringField(required=True)
    description = StringField()
    image = StringField()  # URL de l'image
