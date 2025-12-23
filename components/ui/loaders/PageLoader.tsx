import { PacmanLoader } from "react-spinners";

type Props = {};

const PageLoader = ({}: Props) => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <PacmanLoader color="#615cf6" size={50} />
        </div>
    );
};

export default PageLoader;
