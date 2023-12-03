import Image from "next/image";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div>
      <title>404 Page Not Found</title>

      <div className="flex max-w-xl justify-center items-center flex-col mx-auto p-6 text-gray-800">
        <Image src="/logo.png" alt="404" width={200} height={200} />
        <h1 className="text-6xl md:text-8xl font-bold mt-6">Ooops :(</h1>
        <p className="text-2xl mt-6 text-center">
          We can&#39;t seem to find the page you&#39;re looking for.
        </p>
        <button
          onClick={() => router.replace("/")}
          className="hover:transition-all mt-8 px-5 py-4 bg-teal-500 hover:bg-teal-400 text-white rounded-full"
        >
          Back to home page
        </button>
      </div>
    </div>
  );
}
