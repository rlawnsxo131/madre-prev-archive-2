import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import { AccordionProvider } from './AccordionProvider';
import { AccordionRoot } from './AccordionRoot';
import { AccordionTrigger } from './AccordionTrigger';

export const Accordion = Object.assign(AccordionProvider, {
  Root: AccordionRoot,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
  Item: AccordionItem,
});
