import {Dispatch, FormEvent, SetStateAction, useState} from "react";
import isEmpty from 'lodash.isempty';

import { Dialog, Flex, TextField, Button, Text } from "@radix-ui/themes";

import { saveTodo } from "@/services/todos";

type CreateTodoModalProps = {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>
}

function CreateTodoModal({open,onOpenChange} : CreateTodoModalProps) {
    const [error, setError] = useState('');

    function onTodoSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formElement = event.currentTarget;
        const title = new FormData(formElement).get('todoTitle') as string;

        if (isEmpty(title)){
            setError('Cannot be blank');
            return;
        }

        saveTodo(title);
        setError('');
        onOpenChange(false);
    }

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content>
                <Dialog.Title>Create todo</Dialog.Title>
                <form onSubmit={onTodoSubmit}>
                    <Flex direction={'column'} gap={'4'}>
                        <Flex direction={'column'} gap={'2'}>
                            <label htmlFor={'todoTitle'}>Title</label>
                            <TextField.Input placeholder={'Title'} id={'todoTitle'} name={'todoTitle'}/>
                            {!isEmpty(error) ? <Text color={'red'}>{error}</Text> : null}
                        </Flex>
                        <Flex justify={'end'}>
                            <Button type={'submit'}>Create</Button>
                        </Flex>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default CreateTodoModal;