import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster.tsx";
import logo from "@/assets/images/logo.svg";

const AnonymousLayout = () => {
  return (
    <>
      <Toaster />
      <div className="flex">
        <div className="flex flex-col justify-between bg-neutral-900 h-screen w-1/2">
          <div className="m-5">
            <img src={logo} alt="Tonality Logo"></img>
          </div>
          <div className="m-5">
            <p className="text-neutral-100">
              "Music is the universal language that transcends borders,
              cultures, and time, speaking to the very core of our humanity,
              where words alone often fall short."
            </p>
          </div>
        </div>
        <div className="h-screen w-1/2 bg-neutral-950 flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AnonymousLayout;
