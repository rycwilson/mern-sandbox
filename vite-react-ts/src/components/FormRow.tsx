import kebabCase from 'lodash.kebabcase';

const FormRow = ({ 
  type = 'text', 
  name, 
  labelText, 
  defaultValue = '', 
  autoComplete = 'off',
  required = false,
  onChange 
} : {
  type?: string;
  name: string;
  labelText?: string;
  defaultValue?: string;
  autoComplete?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={kebabCase(name)} className='form-label'>{labelText || name}</label>
      <input
        type={type}
        id={kebabCase(name)}
        name={name}
        className='form-input'
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default FormRow;