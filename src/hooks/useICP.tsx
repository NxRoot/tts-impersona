import { useEffect, useRef } from 'react';
const { ipcRenderer } = window.require('electron');

export default function useICP(key: string, callback: any, trigger?: any) {

    const savedCallback: any = useRef<any>();

    useEffect(() => {
        savedCallback.current = trigger

        ipcRenderer.on(key, (event: any, args: any) => {
            callback && callback(event, args, savedCallback.current)
            ipcRenderer.removeAllListeners(key)
        });
        return () => {
            ipcRenderer.removeAllListeners(key);
        };
    }, [trigger]);

}
