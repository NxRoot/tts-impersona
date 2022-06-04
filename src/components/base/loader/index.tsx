import React from 'react';
import MotionDiv from '../motionDiv';
import Spinner from '../spinner';
import styles from './index.module.css';

export default function Loader(props: any) {
    return props.fade ? (
        <MotionDiv start={props.fade} duration={props.duration}>
            <div className={styles.loader} {...props}>
                <div style={{ marginBottom: '1rem' }}>
                    <Spinner />
                </div>
                <div>{props.text ? props.text : null}</div>
            </div>
        </MotionDiv>
    ) : (
        <div className={styles.loader} {...props}>
            <div style={{ marginBottom: '1rem' }}>
                <Spinner />
            </div>
            <div>{props.text ? props.text : null}</div>
        </div>
    );
}
