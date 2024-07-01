import { Separator } from "@/components/ui/separator";

type Props = { title: string };

function FormHeading({ title }: Props) {
  return (
    <>
      <div className="p-4">
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <Separator className="bg-keppel-400" />
    </>
  );
}

export default FormHeading;
