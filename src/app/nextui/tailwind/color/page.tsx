import React from "react";

export default function Page() {
  return (
    <div className="container mx-auto border p-3 rounded-lg flex flex-col items-start sm:w-1/2">
      <h1 className="text-3xl font-bold m-3">1.Color</h1>
      <div>
        <p className="text-black">text-black</p>
        <p className="text-white">text-white</p>
        <p className="text-red-50">text-red-50</p>
        <p className="text-red-100">text-red-100</p>
        <p className="text-red-200">text-red-200</p>
        <p className="text-red-300">text-red-300</p>
        <p className="text-red-400">text-red-400</p>
        <p className="text-red-500">text-red-500</p>
        <p className="text-red-600">text-red-600</p>
        <p className="text-red-700">text-red-700</p>
        <p className="text-red-800">text-red-800</p>
        <p className="text-red-900">text-red-900</p>
      </div>
      <h1 className="text-3xl font-bold m-3">2.Background Colors</h1>
      <div className="bg-slate-600">
        <p className="text-white">bg-slate-600</p>
      </div>
      <div className="bg-zinc-400">
        <p className="text-white">bg-zinc-600</p>
      </div>
      <div className="bg-emerald-600">
        <p className="text-white">bg-emerald-600</p>
      </div>
      <h1 className="text-3xl font-bold m-3">3.Text underline</h1>
      <p className="underline text-red-700 decoration-red-700">
        Tailwind is awesome
      </p>
      <p className="text-blue-800 underline decoration-blue-600">
        Tailwind is awesome
      </p>
      <h1 className="text-3xl font-bold m-3">4.Border Colors</h1>
      <input
        placeholder="border border-rose-500"
        type="text"
        className="border border-rose-500 w-64"
      />
      <p className="border-2 border-blue-300">border-2 border-blue-300</p>
      <p className="border-2 border-purple-800 p-3">
        border-2 border-purple-800 p-3
      </p>
      <p className="border-2 border-yellow-900">border-2 border-yellow-900</p>
      <h1 className="text-3xl font-bold m-3">5.Divider Colors</h1>
      <div className="divide-y divide-blue-500">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </div>
      <h1 className="text-3xl font-bold m-3">6.Outline Colors</h1>
      <button className="outline outline-blue-500">Subscribe</button>
      <button className="outline outline-purple-600 p-3">Add</button>
      <h1 className="text-3xl font-bold m-3">7.Box Shadow Colors</h1>
      <p className="bg-yellow-300 shadow-lg shadow-green-500/70 text-blue-900 mb-3">
        Opacity defaults to 100, but you can set it.
      </p>
      <button className="bg-cyan-500 shadow-lg shadow-cyan-500">
        Subscribe
      </button>
    </div>
  );
}
