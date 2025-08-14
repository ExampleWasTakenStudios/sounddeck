export const BasicSpinner = () => {
  return (
    <div>
      <div className="relative z-10 top-0 left-0 w-10 aspect-square rounded-full border-4 border-primary/10"></div>
      <div className="relative z-20 -top-10 left-0 w-10 aspect-square rounded-full border-l-4 border-t-4 border-primary animate-spin"></div>
    </div>
  );
};
