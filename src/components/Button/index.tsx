type ButtonProps = {
  name?: string,
  id?: string,
  value: string,
  className: string,
  onClick?: any,
  onChange?: any,
  style?: any,
  disable?: boolean
}

function Button(props: ButtonProps) {
  let { id, value, name, className, onClick, onChange, style, disable } = props

  return <button 
            className={className} 
            id={id} 
            name={name}
            onClick={onClick}
            onChange={onChange}
            style={style}
            disabled={disable}
         >
            {value}
         </button>;
}

export default Button;