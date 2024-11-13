import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return <Button color="error" className="text-red-700 border border-red-800" onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
