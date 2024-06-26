import { useUserContext } from "../UserContext";
import { ScrollArea } from "./ui/scroll-area";

const ProgramDetails = ({ program, onEdit }) => {
    const { user } = useUserContext();

    if (!program) {
        return (
            <div className="p-4 light:text-gray-500">
                Select a program to view details
            </div>
        );
    }

    const { id, ownerUsername, name, ...programDetails } = program;

    const detailsToShow = Object.entries(programDetails).map(([key, value]) => (
        <div key={key} className="grid grid-cols-2 py-2">
            <strong className="capitalize light:text-gray-700">{key}:</strong>
            <span className="light:text-gray-900">{value}</span>
        </div>
    ));

    return (
        <ScrollArea className="w-full h-full">
            <div className="light:bg-white rounded-lg w-[calc(100%-10px)]">
                <h2 className="mb-4 text-xl font-semibold uppercase">{name}</h2>
                <div className="grid gap-2">{detailsToShow}</div>
                {ownerUsername === user?.username && (
                    <button
                        onClick={() => onEdit(program)}
                        className="px-4 py-2 mt-6 bg-blue-600 rounded-lg light:text-white hover:bg-blue-700"
                    >
                        Edit
                    </button>
                )}
            </div>
        </ScrollArea>
    );
};

export default ProgramDetails;
