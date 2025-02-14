"use client";
import WaitlistForm from "./Form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br py-20 from-[#0D2B4B] to-[#071625]">
      <div className="flex-col text-center ">
        <p className="font-bold text-white text-3xl">
          {(203000).toLocaleString()}
        </p>
        <p className=" text-white/70 font-medium">FUsers waitlisted</p>
      </div>

      <div className="flex mt-10 items-center justify-center">
        <WaitlistForm />
      </div>
    </div>
  );
}
