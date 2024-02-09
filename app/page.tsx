"use client"

import { useState } from "react";
import { Button, Flex, Heading, withAuthenticator } from "@aws-amplify/ui-react";

import TodoList from "@/components/TodoList";
import CreateTodoModal from "@/components/CreateTodoModal";

import "@aws-amplify/ui-react/styles.css";

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <Flex
        margin={'16px'}
        rowGap={'32px'}
        direction={'column'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
    >
      <Heading>Todos</Heading>
      <Button
        variation={'primary'}
        onClick={() => setOpen(true)}
      >
        Create
      </Button>
      <TodoList />
      <CreateTodoModal
          open={open}
          onOpenChange={setOpen}
      />
    </Flex>
  );
}

export default withAuthenticator(Home);
