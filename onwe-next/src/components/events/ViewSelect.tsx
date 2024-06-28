import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ViewSelect({
  onClick,
}: {
  onClick: (currentView: string) => void;
}) {
  const [value, setValue] = useState("comfort");

  return (
    <Tabs defaultValue="comfort" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          className={cn("text-center py-2", {
            // "bg-black text-white": value === "list",
            "border border-black rounded-full": value == "list",
          })}
          value="list"
          onClick={() => {
            setValue("list");
            onClick("list");
          }}
        >
          List View
        </TabsTrigger>
        <TabsTrigger
          className={cn("text-center py-2", {
            // "bg-black text-white": value === "comfort",
            "border border-black rounded-full": value == "comfort",
          })}
          value="comfort"
          onClick={() => {
            setValue("comfort");
            onClick("comfort");
          }}
        >
          Comfort View
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
