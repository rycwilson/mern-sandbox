import { Link } from 'react-router';

function Register() {
  return (
    <>
      <h1>Register</h1>
      <form action="" className="form">
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            Name:{' '}
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="form-input" 
              defaultValue="Ryan" 
              required/>
          </label>
        </div>
        <button>Register</button>
      </form>
      <Link to="/login">Login</Link>
    </>
  )
}

export default Register;