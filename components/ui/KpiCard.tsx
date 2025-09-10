import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface IProduct {
  id: string;
  name: string;
  image: string;
}

interface IUser {
  id: string;
  name: string;
  image: string;
}

export interface IKpiCardProps {
  title: string;
  product?: IProduct;
  user?: IUser;
  value?: string | number;
  trend?: number;
  icon?: React.ReactNode;
  seeMoreLink?: string;
}

export default function KpiCard(props: IKpiCardProps) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
      <div className="flex flex-row justify-between items-center">
        {props.icon && (
          <div className="text-2xl text-blue-500 flex flex-row justify-start items-center gap-4">
            {props.icon}
          </div>
        )}
        <h4 className="text-lg font-normal text-end">{props.title}</h4>
      </div>
      {props.value !== null && (
        <h3 className="text-2xl font-semibold">{props.value}</h3>
      )}
      {props.trend !== undefined && (
        <span className="text-sm text-green-500 flex items-center">
          {props.trend > 0 ? <FaCaretUp /> : <FaCaretDown />}{" "}
          {Math.abs(props.trend)}%
        </span>
      )}
      {props.product !== undefined && (
        <Link
          href="/"
          className="flex flex-row justify-between items-end my-2"
        >
          <Image
            src={props.product.image}
            alt={props.product.name}
            width={60}
            height={40}
            className="aspect-3/2 object-cover rounded-lg"
          />
          <h3 className="text-lg font-semibold text-end">{props.product.name}</h3>
        </Link>
      )}
      {props.user !== undefined && (
        <Link
          href="/"
          className="flex flex-row justify-between items-end my-2"
        >
          <Image
            src={props.user.image}
            alt={props.user.name}
            width={40}
            height={40}
            className="aspect-square object-cover rounded-full"
          />
          <h3 className="text-lg font-semibold text-end">{props.user.name}</h3>
        </Link>
      )}
      {props.seeMoreLink && (
        <Link
          href={props.seeMoreLink}
          className="text-sm text-blue-500 flex items-center"
        >
          See More
        </Link>
      )}
    </div>
  );
}
