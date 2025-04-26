import { type ActionFunction, Form, redirect, useNavigation, Link, useActionData } from 'react-router';
import FormRow from '../components/FormRow.tsx';
import Wrapper from '../assets/wrappers/register-and-login.ts';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return redirect('/login');
  } catch (error) {
    return error
  }
}

export default function Register() {
  // const formData = useActionData();
  
  return (
    <Wrapper>
      <Form method="post" className="form" noValidate>
        <h4>Register</h4>
        <FormRow name="firstName" labelText="First Name" required/>
        <FormRow name="lastName" labelText="Last Name" />
        <FormRow type="email" name="email" labelText="Email" autoComplete="email" required />
        <FormRow type="password" name="password" labelText="Password" autoComplete="new-password" required/>
        <button className="btn btn-block">Register</button>
      </Form>
      <Link to="/login">Login</Link>
    </Wrapper>
  )
}