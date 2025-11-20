import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface IData {
  type?: string;
  title: string;
  value: any;
}

export interface IReportListItemProps {
  data: IData[];
}

export function ReportListItem(props: IReportListItemProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-300 flex flex-row flex-wrap gap-4 items-start justify-between">
      {props.data.map((item, index) => (
        <div
          key={index.toString()}
          className={`flex flex-col w-2/5 ${
            index % 2 === 0 ? "" : "text-right"
          }`}
        >
          <span className="text-gray-500 text-sm">{item.title}</span>
          <span className="font-medium">
            {item.type === "product" ? (
              <span className="px-2 py-4 font-medium flex items-center justify-center gap-6">
                <Link href={`/dashboard/products/${item.value.id}`}>
                  <Image
                    src={item.value.image}
                    alt={item.value.name}
                    width={60}
                    height={60}
                    className="aspect-square max-w-10 h-10 scale-70 object-cover rounded-full"
                  />
                </Link>
                <Link href={`/dashboard/products/${item.value.id}`}>
                  {item.value.name}
                </Link>
              </span>
            ) : item.type === "user" ? (
              <span className="px-2 font-medium text-center">
                <div className="flex flex-col items-start justify-center gap-2">
                  <Link href={`/dashboard/products/${item.value.id}`}>
                    <Image
                      src={item.value.image}
                      alt={item.value.name}
                      width={60}
                      height={60}
                      className="aspect-square max-w-10 h-10 scale-70 object-cover rounded-full"
                    />
                  </Link>
                  <Link
                    href={`/dashboard/products/${item.value.id}`}
                    className="text-left"
                  >
                    {item.value.name}
                  </Link>
                </div>
              </span>
            ) : (
              <span>{item.value}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
