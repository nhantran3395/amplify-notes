import {Dispatch, SetStateAction} from "react";

import { Dialog, Flex, TextField, Button } from "@radix-ui/themes";

type CreateTodoModalProps = {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>
}

function CreateTodoModal({open,onOpenChange} : CreateTodoModalProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content>
                <Dialog.Title>Create todo</Dialog.Title>
                <Flex direction={'column'} gap={'2'}>
                    <TextField.Input placeholder={'Title'}/>
                    <Flex align={'end'}>
                        <Dialog.Close>
                            <Button>Create</Button>
                        </Dialog.Close>
                    </Flex>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default CreateTodoModal;