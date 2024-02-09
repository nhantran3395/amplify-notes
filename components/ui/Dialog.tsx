import {Dispatch, PropsWithChildren, SetStateAction} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { Button, Flex } from '@aws-amplify/ui-react';

import styles from './Dialog.module.css';

type DialogProps = {
    open: boolean,
    onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const CustomDialog = ({ open, onOpenChange, children } : PropsWithChildren<DialogProps>) => (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
            <Dialog.Overlay className={styles.dialogOverlay} />
            <Dialog.Content className={styles.dialogContent}>
                <Dialog.Close asChild>
                    <Flex justifyContent={'flex-end'}>
                        <Button aria-label="Close">
                            <Cross2Icon />
                        </Button>
                    </Flex>
                </Dialog.Close>
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);

CustomDialog.Content = Dialog.Content;
CustomDialog.Title = Dialog.Title;
CustomDialog.Close = Dialog.Close;

export type { DialogProps };
export default CustomDialog;