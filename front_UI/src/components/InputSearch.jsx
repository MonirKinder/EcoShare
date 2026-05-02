function InputSearch({ value, onChange }) {
    return (
        <div>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                className={'inputSearch'}
                placeholder={'Rechercher'} />
        </div>
    )
}

export default InputSearch;
