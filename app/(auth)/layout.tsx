import { ReactNode } from "react";
import Image from "next/image";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex ">
      <section className="bg-brand p-10 justify-center hidden w-1 items-center lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[400px] flex-col justify-center space-y-12">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={224}
            height={20}
          />
          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files</h1>
            <p className="body-1">
              This is a place where you can store all your files
            </p>
          </div>
          <Image
            src="/assets/images/files.png"
            alt="logo"
            width={342}
            height={342}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/assets/icons/logo-full-brand.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>
        {children}
      </section>
    </div>
  );
}
