type TodoItem = { id: number; name: string };

export default function TodoItem({ todoItem }: { todoItem: string }) {
  return (
    <div className="flex items-center space-x-2 justify-between">
      <div className="mr-1 bg-slate-300 flex-grow">{todoItem}</div>
      <div className="flex items-center space-x-4">
        <div>
          <input type="checkbox" />
          <span>Finish</span>
        </div>

        <button className="border shadow-sm px-2 rounded-lg">Edit</button>
        <button className="border shadow-sm px-2 rounded-lg">Delete</button>
      </div>
    </div>
  );
}
