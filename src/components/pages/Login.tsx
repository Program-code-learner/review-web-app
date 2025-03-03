import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import axios from "../../utils/axiosConfig";
import { useAuth } from "./AuthProvider";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data);
      const userData = {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email
      };
      
      // Call login with the user data
      login(userData);
      
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/IN-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg)`
      }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-black/80 rounded-lg backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-white mb-8">Sign In</h1>
        
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-12"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Input
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-12"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold"
          >
            Sign In
          </Button>
        </form>

        <div className="text-gray-400 text-center">
          New ?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-white cursor-pointer hover:underline"
          >
            Sign up now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;