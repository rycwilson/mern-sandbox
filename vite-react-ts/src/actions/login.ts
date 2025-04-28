import { type ActionFunction, redirect } from 'react-router';
import { toast } from 'react-toastify';

const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // simple validation with useActionData (see component)
  const errors = { msg: '' };
  if (data.password.length < 8) {
    errors.msg = 'Password must be at least 8 characters long';
    return errors;
  }

  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to log in user');
    }
    toast.success('Logged in successfully');
    return redirect('/dashboard');
  } catch (error) {
    // toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    // return error;
    errors.msg = error instanceof Error ? error.message : 'An unexpected error occurred';
    return errors;
  }
}

export default action;