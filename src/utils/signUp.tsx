import { useState } from "react";

const SignUpButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSignIn = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "";
  };

  return (
    <div>
      <button
        className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-gray-300"
        onClick={handleSignIn}
      >
        Sign In
      </button>

      {showModal && (
        <div className="fixed z-50 right-0 top-0 left-0 bottom-0 outline-none focus:outline-none">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg flex flex-col w-[100%] h-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">Sign In</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {/*content goes here*/}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              {/*footer content goes here*/}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpButton;
