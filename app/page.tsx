import { FarmHomepage } from "@/app-components/Home";

export default function Home() {
  return (
    <div className="w-full relative">
      <FarmHomepage />
      <div className="overlay-root" />
    </div>
  );
}
