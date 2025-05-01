import Todo from "./todo"

export default async function Todos() {
  const todos = await fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json());
  await new Promise(res => setTimeout(() => res(), 2000));
  
  return (
    <div className="bg-white p-[1em] rounded-lg">
      <ul className="flex flex-col gap-[1em]">
        {todos.map((todo, idx) => (
          <li key={idx}>
            <Todo todo={todo}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
