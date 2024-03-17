import { FormModel } from "@/db/mongodb/models/form";
import ClientForm from "./ClientForm";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const formTestData = await FormModel.find();
  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-4">Server Side Form</h1>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">1.Inline Action</h2>
      </div>
      <form
        action={async (formData: FormData) => {
          "use server";
          const data = await FormModel.create({
            name: formData.get("name")?.toString(),
            email: formData.get("email")?.toString(),
          });
          revalidatePath("/nextui/react/form");
          console.log(data);
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            type="text"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-2xl font-bold my-2">
          2.Client Inline Action but with action in file
        </h2>
        {/* Client component can directly used in the server component, but server component should imported in the client
        component as props */}
        <ClientForm></ClientForm>
      </div>
      <div>
        <div className="my-4 text-2xl">Test Data</div>
        {formTestData &&
          formTestData.map((data: any, index: number) => (
            <div key={data._id.toString()}>
              {data.name}-{data.email}
            </div>
          ))}
      </div>
    </div>
  );
}
