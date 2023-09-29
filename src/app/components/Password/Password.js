import React from 'react';
import s from './Password.module.css';
// import {NewIcon} from "../../UI/NewIcon/NewIcon";
import {NewInput} from "../../UI/NewInput/NewInput";
import NewIcon from "../../UI/NewIcon/NewIcon";

export const Password = ({
                             onChange,
                             password,
                             confirmPassword,
                         }) => {

    const validations = {
        '1 letra minúscula': new RegExp('^(?=.*[a-z])'),
        '1 letra mayúscula': new RegExp('^(?=.*[A-Z])'),
        'Almenos 1 número': new RegExp('^(?=.*\\d)'),
        'Mínimo 8 caracteres': new RegExp('^[A-Za-z\\d@$!%*?&.]{8,}$'),
        // 'special': new RegExp('^(?=.*\\d)(?=.*[@$!%*?&])'),
    }

    return (
        <div className={s.container}>
            <div className={`f20-500 ${s.title}`}>
                Datos de configuración de cuenta
            </div>
            <div className={s.row}>
                <NewInput placeholder={'Contraseña'}
                          onFinish={onChange}
                          value={password}
                          type={'password'}
                          name={'password'}
                    // validationKey={'password'}
                    // errorMassage={''}
                />
                <NewInput placeholder={'Reconfirmar Contraseña'}
                          onFinish={onChange}
                          type={'password'}
                    // validationKey={'password'}
                    // errorMassage={''}
                          value={confirmPassword}
                          name={'password_confirmation'}
                />
            </div>
            <div className={`f20-500 ${s.title}`}>Política de contraseñas</div>
            <div className={s.row}>
                <div>{Object.entries(validations).map(([key, value]) => {
                    return <List key={key} label={key} isValid={password === undefined ? false : value.test(password)}/>
                })}</div>
                <div>
                    <List label={'Las contraseñas no coinciden'}
                          isValid={password && password === confirmPassword}
                    />
                </div>
            </div>
        </div>
    );
}

const List = ({label, isValid}) => {

    return (
        <div className={s.list_container} style={{
            color: isValid ? 'var(--dark-blue)' : 'var(--red)'
        }}>
            <NewIcon type={isValid ? 'CheckedGreen' : 'CloseRed'}/>
            {label}
        </div>
    )
}


