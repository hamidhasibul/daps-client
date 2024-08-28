import PageHeading from "@/components/page-heading";

type Props = {};

export default function DoctorsPage({}: Props) {
  return (
    <main>
      <div className="max-w-screen-2xl p-4 md:p-10">
        <PageHeading title="Doctors" />
      </div>
    </main>
  );
}
