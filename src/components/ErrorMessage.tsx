type ErrorMessageProps = {
  children: React.ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div className="text-red-500 text-sm font-bold uppercase p-3 bg-red-50 text-center">
      {children}
    </div>
  );
}
