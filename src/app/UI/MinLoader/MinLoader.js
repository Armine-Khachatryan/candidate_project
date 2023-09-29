import React from 'react'
import classes from './MinLoader.module.css';




function MinLoader (){

    return (
        <div className={classes.container}>
            <div className={classes['lds-ring']}>
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}

export default MinLoader;
