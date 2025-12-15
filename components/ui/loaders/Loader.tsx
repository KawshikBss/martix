import { SyncLoader } from "react-spinners";

type Props = {
    inline?: boolean;
};

const Loader = ({ inline }: Props) => {
    if (inline)
        return (
            <span>
                <SyncLoader color="#615cf6" />
            </span>
        );
    return (
        <div className="w-full text-center my-2">
            <SyncLoader color="#615cf6" />
        </div>
    );
};

export default Loader;
