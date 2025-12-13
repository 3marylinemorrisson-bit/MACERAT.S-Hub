from mongoengine import Document, StringField

class Formation(Document):
    title = StringField(required=True)
    description = StringField()
    image = StringField()  # URL de l'image
