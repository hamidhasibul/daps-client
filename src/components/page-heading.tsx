type Props = {
  title: string;
};

function PageHeading({ title }: Props) {
  return (
    <>
      <div className="mb-2">
        <h1 className="text-xl font-bold tracking-tight mb-2">{title}</h1>
      </div>
    </>
  );
}

export default PageHeading;
