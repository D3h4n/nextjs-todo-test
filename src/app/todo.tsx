"use client";

import {useState,useCallback,useRef} from "react";


type Todo = {
  completed: boolean;
  id: number;
  title: string;
}

export default function Todo(props: { todo: Todo }) {
  const [todo, setTodo] = useState(props.todo);
  const checkedRef = useRef();
  const controller = useRef(new AbortController());

  const handleUpdateTodo = useCallback(async () => {
    const completed = checkedRef.current.checked;
    setTodo((todo) => ({ ...todo, completed })); // optimistic update

    controller.current.abort(); // abort previous request
    controller.current = new AbortController(); // set new controller
    const signal = controller.current.signal;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        signal,
      });
      await new Promise((res) =>  setTimeout(() => res(), 2000)); // simulate network delay
      const result = await response.json();
      setTodo(result);
    }
    catch (err) {
      if (!(err instanceof DOMException) || err.name != "AbortError")
        console.error(err);
    }
  }, [setTodo]);

  return (
    <div className="bg-(--background) rounded-lg px-[20px] py-[10px] flex justify-between shadow-md/50 shadow-(color:--background)">
      <label className="text-lg font-medium select-all" style={{ textDecoration: (todo.completed) ? "line-through" : "none" }}>{todo.title}</label>
      <input className="cursor-pointer" type="checkbox" checked={todo.completed} onChange={handleUpdateTodo} ref={checkedRef}/>
    </div>
  );
}
