
import { useEffect, useState } from 'react';
import { Input, Button, Card } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import api from '../../helper/api';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if(username.length < 5 || email.length < 5 || password.length <5){
      alert("caption length greater than 5")
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post('/users/signu', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setIsLoading(false);
        navigate('/signin'); // Redirect to sign-in page
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      setIsLoading(false)
      setIsError(true);
    }
  };

  useEffect(()=>{
    if(username){
      setIsError(false)
    }
  },[username])

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
            min={5}
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
            min={5}
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
            min={6}
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
            min={6}
          />
          <Button type="submit" className={`${isError? "bg-danger":"bg-primary"}`} fullWidth isLoading={isLoading}>
            {isError? "Something is wrong !":"Sign Up"}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-[#CCC] my-2">
            Already have an account? <span onClick={()=> navigate('/signin')} className="text-blue-400 cursor-pointer">sign in!</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
