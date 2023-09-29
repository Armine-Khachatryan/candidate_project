import React from 'react'
import email from '../../assets/images/mail.png';
import {NewButton} from "../../UI/NewButton/NewButton";
import {NewInput} from "../../UI/NewInput/NewInput";
import s from './EmailConfirmation.module.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Steper} from "../../components/Steper/Steper";
import Button from "../../UI/Button/Button";
import {useNavigate} from "react-router-dom";


export const EmailConfirmation = () => {

    const navigate=useNavigate();
    const onTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="whole">
            <div>
                <Header/>
                <div className={s.bigContainer}>
                    {/*<Steper/>*/}
                    <div className={s.container}>
                        <img src={email} alt="email"/>
                        <div className={s.title}>¡Gracias por contactarnos!</div>
                        <div className={s.text}>Nuestro equipo comercial se pondrá en contacto lo más pronto posible
                        </div>
                       <Button OnClick={()=>{navigate('/#ar-politics');
                           onTop()}}>Finalizar </Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


// export const EmailConfirmation = () => {
//
//     return (
//         <div className="whole">
//             <div>
//                 <Header/>
//                 <div className={s.bigContainer}>
//                     <Steper/>
//                     <div className={s.container}>
//                         <img src={email} alt="email"/>
//                         <div className={`f32-600`}>Revisa tu correo</div>
//                         <div className={`f20-500`}>Confirma tu correo electrónico, ingresa el código de verificación que enviamos a
//                             tú mail
//                         </div>
//                         <div className={s.form}>
//                             <NewInput placeholder={'Código de Verificación'}/>
//                             <NewButton variant={'primary'} label={'Confirmar'}/>
//                         </div>
//                         <div className={s.row}>
//                             <NewButton label={'Re enviar código'} className={`20_500 ${s.btn}`}/>
//                             <NewButton label={'Cambiar correo'} className={`20_500 ${s.btn}`}/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer/>
//         </div>
//     )
// }