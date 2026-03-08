import LogInIcon from '../assets/LogInIcon.jsx'
import SignInIcon from '../assets/SignInIcon.jsx'
function IconButton({title, onClick, type}) {
    return (
        <div style={{backgroundColor : type === 'login' ? '#324C16' : '#829A7C'}} className={'iconButton'} onClick={onClick}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%'}} className={'buttonLabel'}>
                {title}
            </div>
            <div style={{padding:'8px', position: 'relative', top: '-56px'  }}>
                {type === 'login' ? <LogInIcon /> : <SignInIcon />}
            </div>

        </div>
    )
}

export default IconButton;