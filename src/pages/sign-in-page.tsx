import logo from "@/assets/daps-logo-placeholder.svg";
import SigninCard from "@/components/signin-card";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-keppel-200 to-keppel-500 ">
      <div className="flex w-2/3 border bg-white rounded-lg p-4 shadow-lg">
        {/* Logo */}
        <div className="w-1/2 flex items-center justify-center bg-keppel-100 rounded-lg">
          <img src={logo} alt="" className="h-52 w-52" />
        </div>

        {/* Login Form */}
        <div className="w-1/2 ">
          <SigninCard />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
