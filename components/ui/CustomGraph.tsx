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
    colspan?: number;
};

const CustomGraph = ({ title, subtitle, icon, type, data, colspan }: Props) => {
    const displayGraph = (type: string): React.ReactNode => {
        const modifiedData = {
            ...data,
            datasets: data.datasets.map((item) => {
                return {
                    ...item,
                    borderColor:
                        item?.borderColor != undefined
                            ? item?.borderColor
                            : "#615cf6",
                    borderWidth: 2,
                    backgroundColor:
                        item?.backgroundColor != undefined
                            ? item?.backgroundColor
                            : "#615cf6A6",
                };
            }),
        } as ChartData;
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
                        data={modifiedData as ChartData<"bar">}
                        className="my-auto"
                    />
                );
            case "pie":
                return (
                    <Doughnut data={modifiedData as ChartData<"doughnut">} />
                );
            default:
                return (
                    <Line
                        options={options}
                        data={modifiedData as ChartData<"line">}
                        className="my-auto"
                    />
                );
        }
    };
    return (
        <div
            className={`w-full h-full bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between col-span-${colspan ?? 1}`}
        >
            <div className="flex flex-row justify-start items-center">
                {icon && <div className="text-xl mr-2">{icon}</div>}
                <h4 className="text-lg font-normal">{title}</h4>
            </div>
            {displayGraph(type ?? "line")}
        </div>
    );
};

export default CustomGraph;
