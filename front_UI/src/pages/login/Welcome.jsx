import Button from '../../components/Button.jsx'
import StartLogo from "../../assets/StartLogo.jsx";
import IconButton from "../../components/IconButton.jsx";

import { useMainContext } from "../../hooks/UseMain.jsx"

const Welcome = () => {
    const {configPages, setActivePage} = useMainContext();
    console.log(configPages);
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'auto',
                gridGap: '10px',
                justifyItems: 'center',
                alignItems: 'center',
            }}>

            <div className={'startLogoPadding'}>
                <StartLogo/>
            </div>
            <h1>
                La seconde main, à<br/> portée étudiante
            </h1>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap : '20px'}}>
                <IconButton type={'login'} title={'Se connecter'} onClick={() => setActivePage(configPages.login.id)} />
                <IconButton type={'signIn'} title={'Créer un compte'} onClick={() => setActivePage(configPages.signIn.id)} />
            </div>

        </div>
    )
}

export default Welcome