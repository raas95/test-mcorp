
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className="flex items-center space-x-2">
            <IoIosArrowBack className="text-2xl" />
            <span>Back</span>
        </button>
    );
};
export default BackButton;
