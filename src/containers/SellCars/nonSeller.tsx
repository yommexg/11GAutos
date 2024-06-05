import { useState } from "react"; // Correct import statement
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/store";
import { sellerRequest } from "../../redux/slice/userSlice";

interface IdentificationOption {
  value: string;
  label: string;
}

const identificationOptions: IdentificationOption[] = [
  { value: "nin", label: "National Identification Number (NIN)" },
  { value: "license", label: "Diving License" },
  { value: "passport", label: "Passport" },
];

const NonSeller: React.FC<{ accessToken: string; userId: string }> = ({
  accessToken,
  userId,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const bytesToMB = (bytes: number): string => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleSendDocument = () => {
    if (!selectedValue) {
      toast.error("Please Select Identification Type");
    } else if (!selectedFile) {
      toast.error("Please Choose File");
    } else if (selectedFile && selectedValue && accessToken && userId) {
      dispatch(
        sellerRequest({
          accessToken,
          documentName: selectedValue,
          selectedFile: selectedFile,
          userId,
        })
      );
    }
  };

  return (
    <div className="py-20 flex flex-col gap-6 items-center">
      <h2 className="text-center mb-4 md:hidden text-blue-600 text-lg font-bold">
        Please Verify Document <br /> to Upload Car
      </h2>
      <h2 className="text-center mb-4 hidden md:block text-blue-600 font-bold text-2xl">
        Please Verify Document to Upload Car
      </h2>
      <select
        className="border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 block"
        onChange={handleSelectChange}
        value={selectedValue}
      >
        <option value="">Select Identification</option>
        {identificationOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          className="border rounded px-3 py-2 mt-4 focus:outline-none focus:ring-1 focus:ring-blue-500 block"
        />
        {selectedFile && (
          <p className="mt-4 text-sm px-6 italic">
            {selectedFile.name} ({bytesToMB(selectedFile.size)})
          </p>
        )}
      </div>

      <button
        onClick={handleSendDocument}
        className="p-4 bg-black text-white rounded-lg
        hover:opacity-65 px-8 md:mt-4"
      >
        Send Request
      </button>
    </div>
  );
};

export default NonSeller;
