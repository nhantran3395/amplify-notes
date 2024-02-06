"use client"

import { withAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import TodoList from "@/components/TodoList";

function Home() {
  return (
      <TodoList />
  );
}

export default withAuthenticator(Home);
