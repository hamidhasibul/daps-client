import FormHeading from "@/components/form-heading";
import PageHeading from "@/components/page-heading";
import AccountInfoForm from "./components/account-info-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SettingsPage = () => {
  return (
    <main>
      <div className="max-w-screen-2xl p-4 md:p-10">
        <PageHeading title="Settings" />
        <div className="flex justify-between gap-10">
          <div className="w-2/3 ">
            <div className=" bg-keppel-100 rounded-md">
              <FormHeading title="Account Information" />
              <div className="p-4">
                {/* Account Info Form */}
                <AccountInfoForm />
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="bg-keppel-100 rounded-md">
              <FormHeading title="Photo" />
              <div className="p-4">
                {/* Content */}

                <div className="mb-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Edit your photo</span>
                    <span className="text-xs font-medium text-red-500 cursor-pointer">
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
