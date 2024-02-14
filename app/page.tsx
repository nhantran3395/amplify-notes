"use client"

import { useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Flex, Heading, Button } from "@radix-ui/themes";

import TodoList from "@/components/TodoList";
import CreateTodoModal from "@/components/CreateTodoModal";

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <Flex
        direction={'column'}
        justify={'start'}
        align={'start'}
        gap={'4'}
    >
      <Heading>Todos</Heading>
      <Button
        onClick={() => setOpen(true)}
      >
        Create
      </Button>
      <TodoList />
      <CreateTodoModal
          open={open}
          onOpenChange={setOpen}
          key={window.crypto.randomUUID()}
      />
    </Flex>
  );
}

export default withAuthenticator(Home);
