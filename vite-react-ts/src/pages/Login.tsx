import { Form, useNavigation, Link, useActionData } from 'react-router';
import FormRow from '../components/FormRow.tsx';
import Wrapper from '../assets/wrappers/register-and-login.ts';

export default function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // simple validation with useActionData
  const errors = useActionData();

  return (
    <Wrapper>
      <Form method="post" className="form" noValidate>
        <h4>Login</h4>
        {errors?.msg ?
          <p style={{color:'red'}}>{errors.msg}</p> :
          <p>Don't have an account?&nbsp;&nbsp;<Link to="/register">Register</Link></p>
        }
        <FormRow type="email" name="email" labelText="Email" autoComplete="email" required />
        <FormRow type="password" name="password" labelText="Password" autoComplete="new-password" required/>
        <button className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' :  'Login'}
        </button>
      </Form>
    </Wrapper>
  )
}