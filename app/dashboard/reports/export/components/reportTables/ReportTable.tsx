import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface IData {
  type?: string;
  value: any;
}

export interface IReportTableProps {
  headers: string[];
  data: IData[][];
}

export default function ReportTable(props: IReportTableProps) {
  return (
    <table className="hidden md:block w-full text-left mt-8 border border-gray-300 rounded-md">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          {props.headers.map((header, index) => (
            <th className="px-2 py-2 font-normal text-center" key={index}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b border-gray-300 hover:bg-gray-50 text-center"
          >
            {row.map((cell, cellIndex) => {
              if (cell.type === "product") {
                return (
                  <td
                    className="px-2 py-4 font-medium flex items-center justify-center gap-6"
                    key={cellIndex}
                  >
                    <Link href={`/dashboard/products/${cell.value.id}`}>
                      <Image
                        src={cell.value.image}
                        alt={cell.value.name}
                        width={60}
                        height={40}
                        className="aspect-3/2 object-cover rounded-lg"
                      />
                    </Link>
                    <Link href={`/dashboard/products/${cell.value.id}`}>
                      {cell.value.name}
                    </Link>
                  </td>
                );
              } else if (cell.type === "user") {
                return (
                  <td
                    className="px-2 py-4 font-medium text-center"
                    key={cellIndex}
                  >
                    <div className="flex items-center justify-center gap-6">
                      <Link href={`/dashboard/products/${cell.value.id}`}>
                        <Image
                          src={cell.value.image}
                          alt={cell.value.name}
                          width={40}
                          height={40}
                          className="aspect-square object-cover rounded-full"
                        />
                      </Link>
                      <Link href={`/dashboard/products/${cell.value.id}`}>
                        {cell.value.name}
                      </Link>
                    </div>
                  </td>
                );
              }
              return (
                <td className="px-2 py-4" key={cellIndex}>
                  {cell.value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
