import { login } from '../api';

async function handleSubmit(e) {
  e.preventDefault();

  try {
    await login(email, password); // ⬅️ déclenche le stockage
    navigate('/admin');           // ⬅️ après seulement
  } catch (err) {
    alert('Connexion échouée');
  }
}
