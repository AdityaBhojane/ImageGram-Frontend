import { useEffect, useState } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import api from "../../helper/api";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email.length < 5 || password.length <5){
      alert("caption length greater than 5")
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.post("/users/signin", { email, password });
      localStorage.setItem("token", response.data.data); // Save token
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (email) {
      setIsError(false);
    }
  }, [email]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[400px] p-10" css={{ mw: "400px", padding: "20px" }}>
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <Input
            className="my-4"
            clearable
            underlined
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
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
          <Button
            type="submit"
            className={`${isError ? "bg-danger" : "bg-primary"} my-3`}
            fullWidth
            isLoading={isLoading}
          >
            {isError ? "Something is wrong !" : "Sign Up"}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-[#CCC]">
            don&apos;t have an account? <span onClick={()=> navigate('/signup')} className="text-blue-400 cursor-pointer">sign up!</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
