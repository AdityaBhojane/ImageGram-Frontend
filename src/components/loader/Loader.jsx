import { Spinner } from "@nextui-org/react";


function Loader() {
  return (
    // <div>
    //   <div className="flex-col gap-4 w-full flex items-center justify-center">
    //     <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
    //   </div>
    // </div>
    <Spinner label="Loading..." color="warning" />
  );
}

export default Loader;
