from mongoengine import Document, StringField

class User(Document):
    email = StringField(required=True, unique=True)
    hashed_password = StringField(required=True)
    role = StringField(default="user")  # "user" ou "admin"
{
  "email": str,
  "hashed_password": str,
  "role": "user" | "admin"
}
