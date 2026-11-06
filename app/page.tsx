import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Constat from "@/components/Constat";
import Journee from "@/components/Journee";
import Palabre from "@/components/Palabre";
import Confiance from "@/components/Confiance";
import Reperes from "@/components/Reperes";
import Extension from "@/components/Extension";
import Finale from "@/components/Finale";
import ChatButton from "@/components/ChatButton";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Constat />
        <Journee />
        <Palabre />
        <Confiance />
        <Reperes />
        <Extension />
        <Finale />
      </main>
      <ChatButton />
    </>
  );
}
