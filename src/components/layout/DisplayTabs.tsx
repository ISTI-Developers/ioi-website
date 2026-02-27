import type { Tab } from "@/data/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface DisplayTabsProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  tabs: Tab[];
  children: React.ReactNode;
}

function DisplayTabsByStatus({
  selectedStatus,
  setSelectedStatus,
  tabs,
  children,
}: DisplayTabsProps) {
  return (
    <Tabs
      value={selectedStatus}
      onValueChange={setSelectedStatus}
      className=" pt-10"
    >
      <TabsList className="gap-2 ">
        {tabs.map((t) => (
          <TabsTrigger
            key={t.value}
            value={t.value}
            className="whitespace-nowrap flex-shrink-0 data-[state=active]:font-bold"
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent
          key={t.value}
          value={t.value}
          className="mx-auto w-full border rounded-xl py-3.5 p-5"
        >
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default DisplayTabsByStatus;
