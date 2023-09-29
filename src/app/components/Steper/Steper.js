import React from 'react'
import s from './Steper.module.css';
import {useLocation} from "react-router-dom";
import NewIcon from "../../UI/NewIcon/NewIcon";


export const Steper = () => {
    const {pathname} = useLocation()

    return (
        <div className={s.container}>
            <div className={`${s.link} ${pathname === '/email-confirmation' ? s.forgot_password : s.signup}`}>
                {pathname === '/auth/email-confirmation' && <NewIcon type={'CheckedCircleBlack'} size={22}/>}
                Crear Cuenta
            </div>
            {
                pathname === '/email-confirmation' && <div className={`${s.link} `}
                                                                style={{color: 'rgba(212, 212, 212, 1)'}}>
                    {<NewIcon type={'CheckedCircleBlack'}
                           size={22}
                    />}
                    Configurar método de Pago</div>
            }

        </div>
    )
}
