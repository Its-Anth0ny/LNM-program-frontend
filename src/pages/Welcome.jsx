const Welcome = () => {
    return (
        <div className="grid grid-cols-12 h-[calc(100vh-72px)] px-14 gap-4">
            <ul className="text-[5vw] font-semibold flex flex-col items-start justify-center col-span-7">
                <li className="">Navigate Your</li>
                <li className="">Academic Journey</li>
                <li className="text-[5vw] flex gap-4">
                    With <p className="text-red-500">EASE</p>
                </li>
            </ul>
            <div className="flex items-center justify-center col-span-5">
                <img src="/welcome2.png" alt="" className="max-w-full" />
            </div>
        </div>
    );
};

export default Welcome;
