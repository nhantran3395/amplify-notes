"use client";

import { useState, useEffect } from "react";
import { Card, Flex } from '@radix-ui/themes';

import type { Schema } from "@/amplify/data/resource";
import { listTodos, subscribeTodos } from "@/services/todos";

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

    return (
        <Flex
            direction={'row'}
            gap={'4'}
            wrap={'wrap'}
        >
            {todos.map((todo) => (
                <Card key={todo.id}>{todo.content}</Card>
            ))}
        </Flex>
    );
}