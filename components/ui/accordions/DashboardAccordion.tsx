"use client";

import React from "react";
import { FaChevronDown } from "react-icons/fa";

type AccordionContextValue = {
    isExpanded: boolean;
    toggle: () => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
    null
);

function Container({ children }: { children: React.ReactNode }) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const toggle = React.useCallback(() => setIsExpanded((s) => !s), []);

    return (
        <AccordionContext.Provider value={{ isExpanded, toggle }}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3">
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

function Header({ children }: { children: React.ReactNode }) {
    const ctx = React.useContext(AccordionContext);
    if (!ctx) return null;

    return (
        <div
            className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={ctx.toggle}
        >
            {children}

            <button className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FaChevronDown
                    className={`w-4 h-4 text-gray-400 ${
                        ctx.isExpanded ? "transform rotate-180" : ""
                    } transition-transform duration-300 ease-in-out`}
                />
            </button>
        </div>
    );
}

function Expanded({ children }: { children: React.ReactNode }) {
    const ctx = React.useContext(AccordionContext);
    if (!ctx || !ctx.isExpanded) return null;

    return (
        <div className="px-4 pb-4 border-t border-gray-100">
            <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {children}
            </div>
        </div>
    );
}

function Section({
    icon,
    title,
    children,
}: {
    icon?: React.ReactNode;
    title?: string;
    children: React.ReactNode;
}) {
    const ctx = React.useContext(AccordionContext);
    if (!ctx || !ctx.isExpanded) return null;

    return (
        <div className="bg-gray-100 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    {icon && icon}
                    {title && (
                        <span className="text-lg font-bold text-gray-700">
                            {title}
                        </span>
                    )}
                </div>
            </div>

            <div className={`font-medium text-end`}>{children}</div>
        </div>
    );
}

const DashboardAccordion = { Container, Header, Expanded, Section };

export default DashboardAccordion;
