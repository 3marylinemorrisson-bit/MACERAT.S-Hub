import { useEffect } from 'react';
import { checkAdmin } from '../api';

useEffect(() => {
  checkAdmin()
    .then(() => console.log('Accès admin OK'))
    .catch(() => {
      alert('Accès refusé');
      navigate('/login');
    });
}, []);
