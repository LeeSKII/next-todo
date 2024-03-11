import Link from "next/link";
import { Code } from "@nextui-org/react";
import { ArrowBigRight } from "lucide-react";

export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="border rounded-xl p-3">
        <h1 className="text-3xl font-bold my-3">1.Content</h1>
        <h2 className="text-2xl font-bold my-2">1.1 React.js</h2>
        <div className="indent-8">
          <Link href={"nextui/react"} className="flex text-blue-700">
            1.How to use useOptimistic <ArrowBigRight></ArrowBigRight>
          </Link>
        </div>
      </div>
    </div>
  );
}
