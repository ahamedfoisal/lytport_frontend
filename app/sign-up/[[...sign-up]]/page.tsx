import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="bg-white h-screen flex items-center justify-center overflow-hidden">
  
    <div className="relative z-10">
      <SignUp />
    </div>
  </div>
  );
}