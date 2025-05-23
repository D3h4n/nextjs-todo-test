import TodoCard, { Todo } from "./TodoCard";

export default async function Todos() {
  const todos: Todo[] = await fetch(
    "https://jsonplaceholder.typicode.com/todos",
  ).then((res) => res.json());
  await new Promise<void>((res) => setTimeout(() => res(), 3000));

  return (
    <div className="bg-white p-[1em] rounded-lg">
      <ul className="flex flex-col gap-[1em]">
        {todos.map((todo, idx) => (
          <li key={idx}>
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
