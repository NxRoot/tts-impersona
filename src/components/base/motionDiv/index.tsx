import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export type MotionDivProps = {
    children: ReactNode;
    start?: boolean;
    className?: string;
    duration?: number;
    disabled?: boolean
};

export default function MotionDiv(props: MotionDivProps) {
    return (
        <motion.div
            className={props.className}
            initial={{ opacity: props.disabled ? 1 : 0 }}
            animate={{ opacity: props.start ? 1 : 0 }}
            transition={{ duration: props.duration || 1 }}
        >
            {props.children}
        </motion.div>
    );
}
