import React, { ReactNode } from 'react';
import {
    Drawer as CDrawer,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    HStack,
} from '@chakra-ui/react';

export type DrawerSimpleProps = {
    show: boolean;
    onClose?: any;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    disabled?: boolean;
    hidden?: boolean;
    title?: string;
    children?: ReactNode;
    initialRef?: any;
    placement?: 'right' | 'left' | 'top' | 'bottom';
    renderFooter?: () => ReactNode;
    overlayColor?: string;
    headerOptions?: () => ReactNode;
};

export default function DrawerSimple(props: DrawerSimpleProps) {
    return (
            <CDrawer
                isOpen={props.show}
                initialFocusRef={props.initialRef}
                size={props.size || 'lg'}
                placement={props.placement || 'right'}
                onClose={props.onClose}
            >
                <DrawerOverlay bg={props.overlayColor} />
                {props.show ? (
                    <DrawerContent maxW="200px">
                        <HStack justifyContent="space-between" alignItems="center" onClick={props.onClose} cursor="pointer">
                            <DrawerHeader flex="1" fontSize="sm" ml="-2">{props.title || 'Drawer Title'}</DrawerHeader>
                            <DrawerCloseButton size="sm" position="relative" top="0"/>
                        </HStack>
                        {props.children}
                    </DrawerContent>
                ) : null}
            </CDrawer>
    );
}
