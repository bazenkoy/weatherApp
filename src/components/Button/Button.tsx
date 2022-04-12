import { ButtonHTMLAttributes, useCallback, FunctionComponent, ChangeEvent } from 'react'
import './style.css'

type Props = {
  variant: 'primary' | 'secondary' | 'rounded';
  onClick?: (e?: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Noop = () => {}

const Button: FunctionComponent<Props> = ({ variant, onClick = Noop, children, ...rest }) => {
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  return (
      <button
        className={`button button-${variant}`}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
  )
}

export default Button
