import React, {useEffect} from 'react'
import s from './Politics.module.css'
import {NewButton} from "../../UI/NewButton/NewButton";
import NewIcon from "../../UI/NewIcon/NewIcon";
import iphone3dPlay from '../../assets/images/iphone-3d-play.png';
import iphoneScanMe from '../../assets/images/iphone-scan-me.png';
import iphoneMan from '../../assets/images/iphone-man.png';
import exclamationMark from '../../assets/images/exclamation-mark.png';
import person from '../../assets/images/person.png';
import phoneHigh from '../../assets/images/phone-high.png';
import earth from '../../assets/images/earth.png';
import vote from '../../assets/images/vote.png';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";


export const Politics = () => {

    const freeList = [
        'Avatar básico (sin retoques, ni animaciones)',
        'Discurso de presentación.',
        'Logo del movimiento o partido político.',
        'Habilitación de botones de like y unlike',
        'Descarga de QR digital para adaptar a su plan de comunicaciones.',
    ]
    const premiumList = [
        <div>Avatar con <b>retoques</b> y <b>animación</b> de labios y gestos acorde al discurso.</div>,
        <div>Discurso de presentación + propuestas de plan de gobierno y calendario de eventos.</div>,
        <div>Uso <b>exclusivo</b> de la app en la ciudad.1</div>,
        <div>Descarga de QR digital para adaptar a su plan de comunicaciones.</div>,
        <div>1 cuenta de usuario administrador para <b>actualizar</b> los discursos y eventos.</div>,
        <div><b>Acceso a métricas</b> de uso de la aplicación.</div>
    ]

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    return (
        <>
            <div className={s.wholeDiv}>
                <div>
                    <Header/>
            <div className={s.fluid} id="ar-politics">
                <div className={s.container}>
                    <div className={s.block}>
                        {/*<div className={`${s.list} ${s.list_left}`} style={{fontSize: 24}}>*/}
                        <div className={s.titleTextPolitics}>
                            <div>¡Rompe las barreras del pasado!</div>
                            <div>Con AR4Politics conéctate con los ciudadanos de una</div>
                            <div>manera innovadora, inteligente e inmersiva.</div>
                        </div>
                        <div className={s.row}>
                            <img src={iphoneScanMe} alt="iphoneScanMe"/>
                            <div className={`${s.list} ${s.list_right}`}>
                                <div>Sin Descargar Aplicaciones</div>
                                <div>Fácil de usar, el ciudadano escanea un Qr y ¡Listo! Accede por el navegador web de
                                    su
                                    teléfono
                                </div>
                                <div>Tú información, tús propuestas, tus eventos, narradas por tu avatar</div>
                                <div>Al alcance de todos, en cualquier momento y en cualquier lugar</div>
                                <div>Más económico que una valla y más informativo.</div>
                            </div>
                        </div>
                    </div>
                    <img src={iphone3dPlay} alt="iphone3dPlay"/>
                </div>
                <div className={s.button_container}>
                    <NewButton label={'Pruébala ahora'} className={s.btn}/>
                    <NewButton variant={'primary'} label={'Crear Cuenta'}
                               link={'/signup'}
                    />
                </div>
            </div>
            <div className={s.reality_container} id="what-is-ra">
                <div className={s.header}>¿Qué es Realidad Aumentada?</div>
                <div className={s.reality_container_row}>
                    <div className={s.reality_container_left}>
                        <img src={iphoneMan} alt="iphoneMan"/>
                    </div>
                    <div>
                        <div className={s.reality_title}>¡Descubre un nuevo mundo a través de tus dispositivos!</div>
                        <div className={s.textDiv}>La realidad aumentada es la fusión perfecta entre lo real y lo digital, brinda experiencias
                            interactivas e inmersivas. Con la realidad aumentada, se pueden ver objetos virtuales
                            superpuestos en el mundo real, ¡abriendo infinitas posibilidades de aplicación en la vida
                            práctica! Otros sectores ya la han aplicado y esto es lo que tú podrías lograr
                        </div>
                    </div>
                </div>
                <div className={s.reality_block}>
                    <div>
                        <div>
                            <img src={exclamationMark} alt="exclamationMark"/>
                            <div style={{backgroundColor: '#AE84E4'}}>
                                <div>
                                    Mayor <b>atención</b> visual, frente a candidatos con formatos publicitarios
                                    tradicionales.
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={person} alt="person"/>
                            <div style={{backgroundColor: '#60C1E5'}}>
                                <div>
                                    Mayor <b>conexióncon</b> el ciudadano, alcanzando nichos que los formatos
                                    publicitarios
                                    tradicionales no alcanzan.
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={phoneHigh} alt="phoneHigh"/>
                            <div style={{backgroundColor: '#BBA238'}}>
                                <div>
                                    Mayor <b>recordación</b> de la campaña
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={earth} alt="earth"/>
                            <div style={{backgroundColor: '#437C21'}}>
                                <div> Posicionate como el candidato que le apuesta a la <b>transformación digital</b> de
                                    la
                                    ciudad para tener un <b>territorio inteligente</b>.
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={vote} alt="vote"/>
                            <div style={{backgroundColor: '#D0892F'}}>
                                <div>
                                    Incrementa tus <b>Votaciones</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.politics_container} id="costs">
                <div className={s.header_row}>
                    <div style={{flex: 1}}/>
                    <div className={s.politics_header}>Costos</div>
                    <div className={s.header_right}>Disponibilidad de la aplicación desde el 29 de julio hasta el 29 de
                        Octubre
                    </div>
                </div>
                <div className={s.cards}>
                    <div className={`${s.card} ${s.free_card}`}>
                        <div className={s.title_container}>
                            <div>Prueba Gratuita</div>
                            <div>Por 15 dias</div>
                        </div>
                        <div className={s.body}>
                            {freeList.map((item,index) => <React.Fragment key={index}>
                                {renderList(item)}
                            </React.Fragment>)}
                        </div>
                        {/*<div className={s.btn_container}>*/}
                        {/*    <NewButton label={'Crear Cuenta'} variant={'primary'}/>*/}
                        {/*</div>*/}
                    </div>
                    <div className={`${s.card} ${s.premium_card}`}>
                        <div className={s.title_container}>
                            <div>Premium</div>
                        </div>
                        <div className={s.body}>
                            {premiumList.map((item,index) =><React.Fragment key={index}>
                                {renderList(item,true)}
                            </React.Fragment>)}
                        </div>
                        {/*<div className={s.btn_container}>*/}
                        {/*    <NewButton label={'Crear Cuenta'}*/}
                        {/*            variant={'primary'}*/}
                        {/*            className={s.premium_btn}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}

const renderList = (title, isBlack = false) => {
    return (
        <div className={s.list_container}>
           <span>
               <NewIcon type={isBlack ? 'CheckedCircleBlack' : 'CheckedCircle'} size={32}/>
           </span>
            {title}
        </div>
    )
}
