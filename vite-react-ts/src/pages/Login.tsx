import { Link } from 'react-router';
import Wrapper from '../assets/wrappers/register-and-login.ts';

function Login() {
  return (
    <Wrapper>
      <h1>Login</h1>
      <Link to="/register">Register</Link>
    </Wrapper>
  )
}

export default Login;