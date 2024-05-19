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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import ProgramDetails from "./ProgramDetails";
import { Button } from "./ui/button";

const ProgramList = ({
    programs,
    onSelectProgram,
    selectedProgram,
    handleEdit,
}) => {
    return (
        <div className="program-list-container">
            {programs.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px] text-center">
                                Index
                            </TableHead>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">
                                Domain
                            </TableHead>
                            <TableHead className="text-center">
                                Amount
                            </TableHead>
                            <TableHead className="text-center">
                                Details
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {programs.map((program, Index) => (
                            <TableRow
                                key={program.id}
                                onClick={() => onSelectProgram(program)}
                            >
                                <TableCell className="w-[150px] text-center">
                                    {Index + 1}
                                </TableCell>
                                <TableCell className="text-center">
                                    {program.name}
                                </TableCell>
                                <TableCell className="text-center">
                                    {program.domain}
                                </TableCell>
                                <TableCell className="text-center">
                                    {program.price}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Dialog>
                                        <DialogTrigger className="w-full h-full">
                                            <Button>View</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-[425px] w-full max-h-[calc(100vh-100px)] h-full overflow-hidden">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl">
                                                    Program Details
                                                </DialogTitle>

                                                <DialogDescription></DialogDescription>
                                            </DialogHeader>
                                            <hr className="border-gray-300 mr-[5px]" />
                                            <ProgramDetails
                                                program={selectedProgram}
                                                onEdit={handleEdit}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TableCell
                                colSpan="5"
                                className="text-center"
                            ></TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            ) : (
                <p>No programs available.</p>
            )}
        </div>
    );
};

export default ProgramList;
