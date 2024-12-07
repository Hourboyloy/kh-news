"use client";
import HeaderSection from "./HeaderSection";
import Image from "next/image";
import { truncateText3 } from "../utils/truncateText3";
import { truncateText2 } from "../utils/truncateText2";
import { truncateText } from "../utils/truncateText";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
const Life = () => {
  const { newsofLifes } = useGlobalContext();
  console.log(newsofLifes);
  return (
    <div className="mb-4">
      <HeaderSection
        title={"ជីវិតនិងសង្គម"}
        textColor={"text-yellow-500"}
        bgColor={"bg-yellow-500"}
        label={"/life"}
      />
      <div className="flex flex-col md:flex-row space-x-2.5 space-y-4">
        {/* 2 Cols Grid big one */}
        <div className="grid grid-rows-1 grid-cols-3 md:grid-cols-3 space-x-2.5 mt-4">
          {/* Big Card */}
          {newsofLifes?.length > 0 &&
            newsofLifes?.map(
              (data, index) =>
                index === 0 && (
                  <Link
                    href={`/article/${data._id}`}
                    key={index}
                    className="grid col-span-2 rounded-md text-white shadow-lg relative"
                  >
                    <Image
                      width={400}
                      height={400}
                      alt="Image"
                      className="w-full h-full object-cover object-center"
                      src={
                        data.photosDescription.length > 0 &&
                        data.photosDescription.find(
                          (photoObj) => photoObj.photo && photoObj.photo !== ""
                        )?.photo
                      }
                    />
                    <h2 className="left-8 absolute top-[-0.6rem] bg-yellow-500 py-2 px-6">
                      {data.category}
                    </h2>
                    <div className="absolute w-full bottom-0 bg-black bg-opacity-45">
                      <div className="flex flex-col gap-2 px-4 py-4">
                        <h3 className="text-sm md:text-lg">
                          {truncateText3(`${data.title}`)}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )
            )}
          {/* Small Card */}
          <div className="grid grid-rows-2 gap-3">
            {newsofLifes?.length > 0 &&
              newsofLifes.map(
                (data, index) =>
                  index > 0 &&
                  index < 3 && (
                    <Link
                      href={`/article/${data._id}`}
                      key={index}
                      className="space-y-2 shadow-lg rounded-md overflow-hidden"
                    >
                      <Image
                        width={400}
                        height={400}
                        alt="Image"
                        className="w-full h-[80px] md:h-[200px] object-cover object-center"
                        src={
                          data.photosDescription.length > 0 &&
                          data.photosDescription.find(
                            (photoObj) =>
                              photoObj.photo && photoObj.photo !== ""
                          )?.photo
                        }
                      />
                      <div className="flex gap-1 md:gap-2">
                        <h2 className="bg-yellow-500 text-[14px] md:text-[15px] text-white px-4 pt-2">
                          {data.category}
                        </h2>
                        <div className="text-[12px] flex flex-col justify-center">
                          <p>ថ្ងៃនេះ ម៉ោង 14:02</p>
                          <p>ចំនួនមតិ 0</p>
                        </div>
                      </div>
                      <h3 className="pb-2 px-4 text-[14px] md:text-[15px]">
                        {truncateText(`${data.title}`)}
                      </h3>
                    </Link>
                  )
              )}
          </div>
        </div>
        {/* Small Card flex */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
          {newsofLifes?.length > 0 &&
            newsofLifes.map(
              (data, index) =>
                index >= 3 &&
                index < 5 && (
                  <Link
                    href={`/article/${data.id}`}
                    key={index}
                    className="space-y-2 shadow-lg rounded-md overflow-hidden"
                  >
                    <Image
                      width={400}
                      height={400}
                      alt="Image"
                      className="w-full h-[120px] md:h-[200px] object-cover object-center"
                      src={
                        data.photosDescription.length > 0 &&
                        data.photosDescription.find(
                          (photoObj) => photoObj.photo && photoObj.photo !== ""
                        )?.photo
                      }
                    />
                    <div className="flex gap-1 md:gap-2">
                      <h2 className="bg-yellow-500 text-[14px] md:text-[15px] text-white px-4 pt-2">
                        {data.category}
                      </h2>
                      <div className="text-[12px] flex flex-col justify-center">
                        <p>ថ្ងៃនេះ ម៉ោង 14:02</p>
                        <p>ចំនួនមតិ 0</p>
                      </div>
                    </div>
                    <h3 className="pb-2 px-4 text-[14px] md:text-[15px]">
                      {truncateText(`${data.title}`)}
                    </h3>
                  </Link>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default Life;
