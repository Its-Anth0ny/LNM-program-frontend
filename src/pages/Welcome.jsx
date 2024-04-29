import "../utils/App.css";
// import logo from "../utils/1587710975_LNMIIT.jpg";
// import bgImg from "../utils/360 VIEW OF LNMIIT.jpg";
// import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="flex h-[calc(100vh-72px)]">
            <div className="flex-1"></div>
            <ul className="text-[80px] flex flex-col items-start justify-center gap-8 pr-8">
                <li className="">Navigate your</li>
                <li className="">Academic Journey</li>
                <li className="">with Ease</li>
            </ul>
            {/* <div>
                <Link to={LNMURL}>About</Link>
            </div> */}
        </div>
    );
};

export default Welcome;
