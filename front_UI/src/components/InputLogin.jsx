import './components.css'

function InputLogin({el, value, onChange}) {
    return (
        <div>
            <input
                name={el.name}
                className={'inputLogin'}
                placeholder={el.placeholder}
                type={el.type}
                value={value}
                onChange={(e)=>onChange( e.target.name, e.target.value)} />
        </div>
    )
}
export default InputLogin