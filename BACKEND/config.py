import os

# 🔑 SECRET_KEY pour JWT
SECRET_KEY = os.environ.get("SECRET_KEY", "change_this_to_a_strong_random_key")

# 🛢️ MongoDB
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017/macerat_s")

# Superadmin initial (création automatique au premier démarrage)
INITIAL_SUPERADMIN_EMAIL = os.environ.get("INITIAL_SUPERADMIN_EMAIL", "admin@macerat.s")
INITIAL_SUPERADMIN_PW = os.environ.get("INITIAL_SUPERADMIN_PW", "ChangeMe123!")

# CORS : front-end autorisé
CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*")  # remplacer "*" par ton frontend en production

# Dossier pour fichiers uploadés
UPLOAD_DIR = os.environ.get("UPLOAD_DIR", "uploads")
