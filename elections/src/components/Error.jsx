export default function Error({ children: errorMessage }) {
  return (
    <span
      className={`flex justify-center my-4
                  bg-red-300 text-red-900 font-semibold`}
    >
      {errorMessage}
    </span>
  );
}
