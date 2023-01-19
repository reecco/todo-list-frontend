type ButtonProps = {
  name?: string,
  id?: string,
  value: string,
  className: string,
  onClick?: any,
  onChange?: any,
  style?: any
}

function Button(props: ButtonProps) {
  let { id, value, name, className, onClick, onChange, style } = props

  return <button 
            className={className} 
            id={id} 
            name={name}
            onClick={onClick}
            onChange={onChange}
            style={style}
         >
            {value}
         </button>;
}

export default Button;