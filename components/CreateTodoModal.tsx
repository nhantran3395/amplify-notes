import { TextField, Button, Flex } from '@aws-amplify/ui-react';

import Dialog, { type DialogProps } from "@/components/ui";

type CreateTodoModalProps = DialogProps;

function CreateTodoModal({open,onOpenChange} : CreateTodoModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.Content>
                <Dialog.Title>Create todo</Dialog.Title>
                <Flex direction={'column'} columnGap={'12'}>
                    <TextField label={'Title'}/>
                    <Flex alignSelf={'flex-end'}>
                        <Dialog.Close asChild>
                            <Button variation={'primary'}>Create</Button>
                        </Dialog.Close>
                    </Flex>
                </Flex>
            </Dialog.Content>
        </Dialog>
    )
}

export default CreateTodoModal;