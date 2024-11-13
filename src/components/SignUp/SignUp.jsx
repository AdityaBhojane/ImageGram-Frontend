
import { useState } from 'react';
import { Input, Button, Card } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import api from '../../helper/api';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await api.post('/users/signup', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        alert('Sign-up successful!');
        navigate('/signin'); // Redirect to sign-in page
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      alert('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className='overflow-hidden' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card className='w-[400px] p-5' css={{ mw: '400px', padding: '20px' }}>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <Input
            clearable
            underlined
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            className='my-5'
          />
          <Input
            clearable
            underlined
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            className='my-5'
          />
          <Input
            clearable
            underlined
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Input
            clearable
            underlined
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            className='my-5'
          />
          <Button type="submit" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
