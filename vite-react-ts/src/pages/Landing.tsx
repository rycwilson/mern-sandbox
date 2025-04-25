import Wrapper from '../assets/wrappers/Landing';
import { Link } from 'react-router';

function Landing() {
  return (
    <Wrapper>
      <h1>Landing</h1>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
    </Wrapper>
  )
}

export default Landing;