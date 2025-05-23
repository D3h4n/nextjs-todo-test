"use client";

import { useState, useCallback, useRef } from "react";

export type Todo = {
  completed: boolean;
  id: number;
  title: string;
};

export default function TodoCard(props: { todo: Todo }) {
  const [todo, setTodo] = useState(props.todo);
  const inputCheckboxRef = useRef<HTMLInputElement>(null);
  const controller = useRef(new AbortController());
  const networkDelay = 3 * 1000; // 3 second simulated network delay

  const handleUpdateTodo = useCallback(async () => {
    const completed = inputCheckboxRef.current?.checked;

    // return early if no reference to input
    if (completed == null) return;

    // optimistic update
    setTodo((todo) => ({ ...todo, completed }));

    controller.current.abort(); // abort previous request
    // set new controller
    controller.current = new AbortController();
    const signal = controller.current.signal;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ completed }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          signal,
        },
      );
      // simulate network delay
      await new Promise<void>((res, rej) => {
        // reject immediately if signal already aborted
        if (signal.aborted) {
          rej(signal.reason);
          return;
        }
        const timeout = setTimeout(res, networkDelay);
        signal.addEventListener("abort", (e) => {
          clearTimeout(timeout);
          rej(e);
        });
      });
      const result: Todo = await response.json();
      setTodo(result);
    } catch (err) {
      if (!(err instanceof DOMException) || err.name != "AbortError")
        console.error(err);
    }
  }, [todo, setTodo]);

  return (
    <div className="bg-(--background) rounded-lg px-[20px] py-[10px] flex justify-between shadow-md/50 shadow-(color:--background)">
      <label
        className="text-lg font-medium select-all"
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.title}
      </label>
      <input
        className="cursor-pointer"
        type="checkbox"
        checked={todo.completed}
        onChange={handleUpdateTodo}
        ref={inputCheckboxRef}
      />
    </div>
  );
}
