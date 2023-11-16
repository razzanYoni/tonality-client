const NotMatch = () => {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl text-neutral-100">Oops!</h1>
        <p className="my-5 text-neutral-100">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-neutral-100 italic">Not Found</p>
      </div>
    </>
  );
};

export default NotMatch;
