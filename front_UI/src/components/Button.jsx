import './components.css'

const Button = ({title, onClick}) => {
    return (
        <button
            className={'button'}
            onClick={onClick}
        >
            <p className={'buttonLabel'}>
                {title}
            </p>
        </button>
    )
}

export default Button