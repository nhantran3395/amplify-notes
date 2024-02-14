import {Dispatch, SetStateAction} from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Dialog, Flex, TextField, Button, Text, TextArea, Select } from "@radix-ui/themes";

import type { Schema } from "@/amplify/data/resource";
import { saveTodo } from "@/services/todos";

type CreateTodoModalProps = {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>
}

type CreateTodoForm = {
    title: string;
    description: string;
    priority: Exclude<Schema["Todo"]["priority"], null>;
}

function CreateTodoModal({open,onOpenChange} : CreateTodoModalProps) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTodoForm>();

    const onTodoSubmit : SubmitHandler<CreateTodoForm> = (data)=> {
        const {title, description, priority} = data;
        saveTodo(title, description, priority);
        onOpenChange(false);
    }

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content>
                <Dialog.Title>Create todo</Dialog.Title>
                <form onSubmit={handleSubmit(onTodoSubmit)}>
                    <Flex direction={'column'} gap={'4'}>
                        <Flex direction={'column'} gap={'2'}>
                            <label htmlFor={'todoTitle'}>Title</label>
                            <TextField.Input
                                placeholder={'Enter title'}
                                id={'todoTitle'}
                                {...register("title", { required: true })}
                            />
                            {errors.title ? <Text color={'red'}>{'is required'}</Text> : null}
                        </Flex>
                        <Flex direction={'column'} gap={'2'}>
                            <label htmlFor={'todoPriority'}>Priority</label>
                            <Controller
                                control={control}
                                name={'priority'}
                                rules={{required:true}}
                                render={({field}) => {
                                    return (
                                        <Select.Root onValueChange={field.onChange} {...field}>
                                            <Select.Trigger
                                                placeholder={'Pick priority'}
                                                id={'todoPriority'}
                                            />
                                            <Select.Content>
                                                <Select.Item value={"low"}>Low</Select.Item>
                                                <Select.Item value={"medium"}>Medium</Select.Item>
                                                <Select.Item value={"high"}>High</Select.Item>
                                            </Select.Content>
                                        </Select.Root>
                                    );
                                }}
                            />
                            {errors.priority ? <Text color={'red'}>{'is required'}</Text> : null}
                        </Flex>
                        <Flex direction={'column'} gap={'2'}>
                            <label htmlFor={'todoDescription'}>Description</label>
                            <TextArea
                                placeholder={'Enter description'}
                                id={'todoDescription'}
                                {...register("description")}
                            />
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