"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Event } from "@/types/events";
import { updateEvent } from "@/lib/supabase/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  rsvp_enabled: z.boolean(),
  max_guests: z.number().optional(),
});

interface EventRSVPSettingsProps {
  event: Event;
}

export function EventRSVPSettings({ event }: EventRSVPSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rsvp_enabled: event.theme_config.rsvp_enabled,
      max_guests: event.max_guests,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const updated = await updateEvent(event.id, {
        theme_config: {
          ...event.theme_config,
          rsvp_enabled: values.rsvp_enabled,
        },
        max_guests: values.max_guests ?? 100,
      });
      
      if (!updated) {
        throw new Error("Failed to update RSVP settings");
      }

      toast({
        title: "Success",
        description: "RSVP settings updated successfully",
      });
    } catch (error) {
      console.error('Error updating RSVP settings:', error);
      toast({
        title: "Error",
        description: "Failed to update RSVP settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rsvp_enabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Enable RSVP</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Allow guests to RSVP to your event
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="max_guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Guests</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  onBlur={field.onBlur}
                  disabled={!form.watch("rsvp_enabled")}
                  placeholder="Leave empty for unlimited"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
} 