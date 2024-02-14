"use client";

import { useState, useEffect } from "react";
import { Card, Flex, Badge, Text, Button, Em } from '@radix-ui/themes';
import { CheckIcon } from '@radix-ui/react-icons';

import type { Schema } from "@/amplify/data/resource";
import { listTodos, subscribeTodos } from "@/services/todos";

type BadgeColor = 'gray' | 'yellow' | 'red';

const COLOR_PRIORITY_MAP : Record<string, BadgeColor> = {
    'low': 'gray',
    'medium': 'yellow',
    'high': 'red'
}

export default function TodoList() {
    const [todos, setTodos] = useState<Schema["Todo"][]>([]);

    useEffect(() => {
        async function getTodos() {
            const todos = await listTodos();
            setTodos(todos);
        }
        getTodos();
    }, []);

    useEffect(() => {
        const sub = subscribeTodos((todos) => setTodos([...todos]))
        return () => sub.unsubscribe();
    }, []);

    function getColor(priority: Schema["Todo"]['priority']){
        if(!priority) {
            throw new Error('color is invalid');
        }

        return COLOR_PRIORITY_MAP[priority];
    }

    return (
        <Flex
            direction={'row'}
            gap={'4'}
            wrap={'wrap'}
        >
            {todos.map((todo) => (
                <Card key={todo.id}>
                    <Flex direction={'column'} gap={'2'}>
                        <Flex gap={'4'} align={'center'}>
                            <Text style={{ textDecoration: todo.done ? 'line-through' : 'revert'}}>{todo.title}</Text>
                            <Button variant={'ghost'} color={'green'}>{todo.done ? <CheckIcon/> : null}</Button>
                        </Flex>
                        <Text size={'1'}>
                            <Em>{todo.description}</Em>
                        </Text>
                        <Flex justify={'start'}>
                            <Badge color={getColor(todo.priority)}>{todo.priority}</Badge>
                        </Flex>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
}