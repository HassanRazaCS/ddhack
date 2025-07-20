
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
}

export function InterestedLawyers({ lawyers }: InterestedLawyersProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>View Interested Lawyers</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {lawyers.map((lawyer) => (
              <div key={lawyer.id} className="border p-4 rounded-md">
                <h4 className="font-semibold">{lawyer.fullName}</h4>
                <p className="text-sm text-gray-500">{lawyer.jurisdiction}</p>
                <p className="text-sm">{lawyer.specializations.join(", ")}</p>
                <Button asChild size="sm" className="mt-2">
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
