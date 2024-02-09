"use client";

import { useState, useEffect } from "react";
import { Card, Collection } from '@aws-amplify/ui-react'

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
        <Collection
            items={todos}
            type={'list'}
            direction={'row'}
            gap={'24px'}
            wrap={'wrap'}
        >
            {(item) => (
                <Card key={item.id}>{item.content}</Card>
            )}
        </Collection>
    );
}