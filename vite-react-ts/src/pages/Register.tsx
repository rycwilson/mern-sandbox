import { Form, useNavigation, Link, useActionData } from 'react-router';
import FormRow from '../components/FormRow.tsx';
import Wrapper from '../assets/wrappers/register-and-login.ts';

export default function Register() {
  const navigation = useNavigation();
  // console.log(navigation)
  const isSubmitting = navigation.state === 'submitting';  

  return (
    <Wrapper>
      <Form method="post" className="form" noValidate>
        <h4>Register</h4>
        <p>Already have an account?&nbsp;&nbsp;<Link to="/login">Login</Link></p>
        <FormRow name="firstName" labelText="First Name" required/>
        <FormRow name="lastName" labelText="Last Name" />
        <FormRow type="email" name="email" labelText="Email" autoComplete="email" required />
        <FormRow type="password" name="password" labelText="Password" autoComplete="new-password" required/>
        <button className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' :  'Register'}
        </button>
      </Form>
    </Wrapper>
  )
}