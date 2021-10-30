import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

function InfoCard({ img, location, title, description, star, price, total }) {
  return (
    <div
      className="flex py-7 md:px-2 lg:px-2 pr-4 border-b cursor-pointer
     hover:opacity-80 hover:shadow-2xl  transition
      duration-200 ease-out first:border-t "
    >
      <div className="relative h-204 w-40 md:h-52 md:w-80 flex-shrink-0  ">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="md:text-xl lg:text-xl">{title}</h4>
        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-xs md:text-sm lg:text-sm text-gray-500 flex-grow ">
          {description}
        </p>
        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>
          <div className="">
            <p className="text-xs md:text-xl lg:text-xl font-semibold pb-2">
              {price}
            </p>
            <p className="text-xs md:text-lg lg:text-lg text-right font-extralight">
              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
