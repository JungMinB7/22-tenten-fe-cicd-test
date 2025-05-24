export default function SubmitButtonSmall2({
  label,
  execute,
}: {
  label: string;
  execute: () => void;
}) {
  return (
    <button
      onClick={execute}
      className="cursor-pointer bg-myLightBlue text-textOnLight px-4 rounded-full text-xs hover:bg-myBlue hover:text-textOnBlue"
    >
      {label}
    </button>
  );
}
