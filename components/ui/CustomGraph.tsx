import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    PointElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    LineElement,
    ChartData,
} from "chart.js";
ChartJS.register(
    ArcElement,
    PointElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
);

type Props = {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    type?: "line" | "bar" | "pie";
    data: ChartData;
    seeMoreLink?: string;
};

const CustomGraph = ({ title, subtitle, icon, type, data }: Props) => {
    const displayGraph = (type: string): React.ReactNode => {
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: "top" as const,
                },
                title: {
                    display: true,
                    text: subtitle ?? "",
                },
            },
        };
        switch (type) {
            case "bar":
                return (
                    <Bar
                        options={options}
                        data={data as ChartData<"bar">}
                        className="my-auto"
                    />
                );
            case "pie":
                return <Doughnut data={data as ChartData<"doughnut">} />;
            default:
                return (
                    <Line
                        options={options}
                        data={data as ChartData<"line">}
                        className="my-auto"
                    />
                );
        }
    };
    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
            <div className="flex flex-row justify-start items-center">
                {icon && <div className="text-xl mr-2">{icon}</div>}
                <h4 className="text-lg font-normal">{title}</h4>
            </div>
            {displayGraph(type ?? "line")}
        </div>
    );
};

export default CustomGraph;
