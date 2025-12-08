import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import RecipeFinder from "@/components/recipe-finder";
import History from "@/components/history";
import PdfExport from "@/components/pdf-export";
import RecipeList from "@/components/recipe-list";

export { generateMetadata };

export default function Home() {
  return (
    <main className="flex flex-col gap-6 place-items-center place-content-center px-4 grow">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <RecipeFinder />
      <History />
      <PdfExport />
      <RecipeList />
    </main>
  );
}
