import {generateClient} from "aws-amplify/api";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export async function saveTodo (title: string, description: string, priority: Exclude<Schema["Todo"]["priority"], null>) {
    const {errors, data: newTodo} = await client.models.Todo.create({
        title,
        description,
        done: false,
        priority: priority? priority : null,
    })
    console.log(errors, newTodo);
}

export async function listTodos() {
    const { data } = await client.models.Todo.list();
    return data;
}

export function subscribeTodos(onUpdateFn : (todos : Schema["Todo"][]) => void) : any {
    const sub = client.models.Todo.observeQuery().subscribe(({ items }) =>
        onUpdateFn(items)
    );
    return sub;
}