
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";

interface Lawyer {
  id: string;
  fullName: string;
  jurisdiction: string;
  specializations: string[];
  contactEmail: string;
}

interface InterestedLawyersProps {
  lawyers: Lawyer[];
  isOpen: boolean;
}

export function InterestedLawyers({ lawyers, isOpen }: InterestedLawyersProps) {
  return (
    <Accordion type="single" collapsible className="w-full" value={isOpen ? "item-1" : undefined}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="sr-only">Toggle Interested Lawyers</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {lawyers.map((lawyer) => (
              <div key={lawyer.id} className="border p-4 rounded-md flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{lawyer.fullName}</h4>
                  <p className="text-sm text-gray-500">{lawyer.jurisdiction}</p>
                  <p className="text-sm">{lawyer.specializations.join(", ")}</p>
                </div>
                <Button asChild className="h-full">
                  <a href={`mailto:${lawyer.contactEmail}`}>Contact</a>
                </Button>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
