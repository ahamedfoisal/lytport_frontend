import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="bg-white h-screen flex items-center justify-center overflow-hidden">
  
      <div className="relative z-10">
        <SignIn />
      </div>
    </div>
  );
}