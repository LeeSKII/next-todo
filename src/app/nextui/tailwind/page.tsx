import Link from "next/link";

export default function Page() {
  return (
    <div className="container mx-auto mt-3 px-5 ">
      <div className="flex flex-col gap-3">
        <Link className="group" href={"/"}>
          <div className="flex items-center justify-center p-6 rounded-md border shadow-md group-hover:bg-slate-100 group-hover:shadow-xl">
            <span className="group-hover:text-blue-700">Tailwind CSS</span>
          </div>
        </Link>
        <Link className="group" href={"/"}>
          <div className="flex items-center justify-center p-6 rounded-md border shadow-md group-hover:bg-slate-100 group-hover:shadow-xl">
            <span className="group-hover:text-blue-700">Tailwind CSS</span>
          </div>
        </Link>
        <Link className="group" href={"/"}>
          <div className="flex items-center justify-center p-6 rounded-md border shadow-md group-hover:bg-slate-100 group-hover:shadow-xl">
            <span className="group-hover:text-blue-700">Tailwind CSS</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
