"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionSection = () => {
  return (
    <div className="w-sm md:w-xl lg:w-2xl bg-background p-4 shadow">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-b-secondary">
          <AccordionTrigger>Flutter</AccordionTrigger>
          <AccordionContent>
            Flutter is an open-source mobile application development framework
            created by Google.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b-secondary">
          <AccordionTrigger>React</AccordionTrigger>
          <AccordionContent>
            React is a free and open-source front-end JavaScript library for
            building user interfaces based on UI components.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Node.js</AccordionTrigger>
          <AccordionContent>
            Node.js is an open-source, cross-platform JavaScript runtime
            environment for executing JavaScript code outside a web browser.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordionSection;
