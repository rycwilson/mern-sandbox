import { type ActionFunction, redirect } from 'react-router';
import { toast } from 'react-toastify';

const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to register user');
    }
    toast.success('User registered successfully');
    return redirect('/login');
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    return error;
  }
}

export default action;