function GoBackButton({isNotWhite}) {
    let color = isNotWhite ? '#353535' : '#FFF'
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M22.5 9C22.5 9 13.5 15.6284 13.5 18C13.5 20.3718 22.5 27 22.5 27" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default GoBackButton;