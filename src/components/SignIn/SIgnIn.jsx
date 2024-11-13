import { useState } from 'react';
import { Input, Button, Card } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import api from '../../helper/api';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/signin', { email, password });
      localStorage.setItem('token', response.data.data); // Save token
      alert('Sign in successful!');
      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Sign in failed');
    }
  };



  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Card className="w-[400px] p-10" css={{ mw: '400px', padding: '20px' }}>
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <Input className='my-4' clearable underlined label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
          <Input clearable underlined label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
          <Button className="my-5" type="submit" color="primary" fullWidth>Sign In</Button>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
