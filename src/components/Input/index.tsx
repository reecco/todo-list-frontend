type InputProps = {
  name: string,
  id?: string,
  placeholder?: string,
  className: string,
  type: string,
  value?: string,
  accept?: string,
  disable?: boolean,
  onChange?: any,
  onClick?: any,
  readOnly?: boolean,
  ref?: any
}

function Input(props: InputProps) {
  const { type, className, id, placeholder, name, value, disable, accept, onChange, onClick, readOnly, ref } = props;

  return <input 
            type={type} 
            className={className} 
            id={id}
            name={name} 
            placeholder={placeholder}
            value={value}
            disabled={disable}
            accept={accept}
            onChange={onChange}
            onClick={onClick}
            readOnly={readOnly}
            ref={ref}
         />;
}

export default Input;