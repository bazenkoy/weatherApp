import { FunctionComponent } from 'react'
import './style.css'

type Props = {
    size?: 'small' | 'large',
};

const Card: FunctionComponent<Props> = ({ size = 'small', children }) => (
    <div className={`card card-${size}`}>{children}</div>
)

export default Card
