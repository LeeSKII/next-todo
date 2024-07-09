export default async function Page() {
  return (
    <div className="container mx-auto p-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-600 h-64 rounded-lg shadow-lg p-4"></div>
        <div className="bg-slate-600 h-64 rounded-lg shadow-lg p-4"></div>
        <div className="bg-slate-600 h-64 md:col-span-2 rounded-lg shadow-lg p-4"></div>
        <div className="bg-slate-600 h-64 md:col-span-3 rounded-lg shadow-lg p-4"></div>
        <div className="bg-slate-600 h-64 rounded-lg shadow-lg p-4"></div>
        <div className="bg-slate-600 h-64 md:col-span-4 rounded-lg shadow-lg p-4"></div>
      </div>
    </div>
  );
}
