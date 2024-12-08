"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import Container from "../components/Container";
import Entertainment from "../components/Entertainment";
import Life from "../components/Life";
import Slide from "../components/Slide";
import Sport from "../components/Sport";
import Loading from "./loading";

export default function Home() {
  const { isLoading } = useGlobalContext();

  return (
    <div className="w-full">
      {isLoading.slide && isLoading.entertainment && isLoading.sport ? (
        <Loading />
      ) : (
        <section className="w-full mt-2 lg:mt-0">
          <Container>
            <Slide />
            <Entertainment />
            <Sport />
            <div className="bg-red-700 mt-4 h-6 w-full SFPro text-2xl text-white font-bold py-6 flex items-center justify-center">
              Sponsor
            </div>
            <Life />
          </Container>
        </section>
      )}
    </div>
  );
}
