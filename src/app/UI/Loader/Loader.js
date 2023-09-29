import React from 'react'
import classes from './Loader.module.css';


function Loader (){
    return(
        <div className={classes.container}>
            <div className={classes['lds-ripple']}>
                <div></div><div></div>
            </div>
        </div>
    )
}

export default Loader;
