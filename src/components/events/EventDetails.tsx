import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Event } from "@/types/events";
import { EventGeneralSettings } from "./EventGeneralSettings";
import { EventRSVPSettings } from "./EventRSVPSettings";
import { EventDesignSettings } from "./EventDesignSettings";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <Card className="p-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rsvp">RSVP</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <EventGeneralSettings event={event} />
        </TabsContent>
        <TabsContent value="rsvp">
          <EventRSVPSettings event={event} />
        </TabsContent>
        <TabsContent value="design">
          <EventDesignSettings event={event} />
        </TabsContent>
      </Tabs>
    </Card>
  );
} 