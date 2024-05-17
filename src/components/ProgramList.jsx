import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

const ProgramList = ({ programs, onSelectProgram }) => {
    return (
        <div className="program-list-container">
            <h2>Programs List</h2>
            {programs.length > 0 ? (
                programs.map((program) => (
                    <div
                        key={program.id}
                        className=""
                        onClick={() => onSelectProgram(program)}
                    >
                        <h3>{program.name}</h3>
                        <p>
                            <strong>Domain:</strong> {program.domain}
                        </p>
                        <p>
                            <strong>Price:</strong> INR {program.price}
                        </p>
                    </div>
                ))
            ) : (
                <p>No programs available.</p>
            )}
        </div>
    );
};

export default ProgramList;
