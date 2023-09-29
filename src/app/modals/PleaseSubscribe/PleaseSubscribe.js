import React from 'react'
import s from './pleaseSubscribe.module.css';
import {NewButton} from "../../UI/NewButton/NewButton";
import {NewIcon} from "../../UI/NewIcon/NewIcon";

export const PleaseSubscribe = ({onCloseModal}) => {

    return (
        <div className={s.container}>
            <div className={`f30-700 ${s.title}`}>Please Subscribe</div>
            <div className={s.orange_block}>
                <NewIcon type={'InfoLight'} size={67}/>
            </div>
            <div className={`f18-300 ${s.subtitle}`}>please purchase an essay credit or subscribe</div>
            <div className={s.btn_container}>
                <NewButton label={'Subscribe now'} variant={'primary'} className={`${s.subscibe_btn}`}/>
                <NewButton label={'Cancel'} variant={'secondary'} onClick={onCloseModal}/>
            </div>
        </div>
    )
}

