import { SyncLoader } from "react-spinners";

type Props = {};

const Loader = (props: Props) => {
    return (
        <div className="w-full text-center my-2">
            <SyncLoader color="#615cf6" />
        </div>
    );
};

export default Loader;
