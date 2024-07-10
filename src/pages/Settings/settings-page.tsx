import { useState } from "react";
import FormHeading from "@/components/form-heading";
import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";
import AccountInfoForm from "./components/account-info-form";
import EditImageCard from "./components/edit-image-card";
import ChangePassModal from "./components/change-pass-modal";

import { useProfile } from "@/services/queries/me";

const SettingsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const { data: profileData, isPending, isError } = useProfile();

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <main>
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => {
          setIsAlertOpen(false);
        }}
        loading={false}
        onConfirm={() => {}}
      />
      <ChangePassModal isOpen={isOpen} onClose={onClose} />

      <div className="max-w-screen-2xl p-4 md:p-10">
        <PageHeading title="Settings" />
        <div className="flex justify-between gap-10">
          <div className="w-2/3 ">
            <div className=" bg-keppel-100 rounded-md">
              <FormHeading title="Account Information" />
              <div className="p-4">
                {/* Account Info Form */}
                {isPending && <>Loading...</>}
                {isError && <>Error loading data...</>}
                {profileData && <AccountInfoForm data={profileData} />}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex flex-col space-y-3">
              <EditImageCard />

              {/* Change Password */}

              <div className="bg-keppel-100 rounded-md ">
                <div className="p-4">
                  <Button
                    size={"sm"}
                    onClick={onOpen}
                    className="w-full bg-keppel-600 hover:bg-keppel-700 active:bg-keppel-800 "
                  >
                    Change password
                  </Button>
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
