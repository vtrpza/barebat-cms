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

const formSchema = z.object({
  primary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
  secondary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
  font_family: z.string().min(1, "Font family is required"),
});

interface EventDesignSettingsProps {
  event: Event;
}

export function EventDesignSettings({ event }: EventDesignSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primary_color: event.settings.theme.primary_color,
      secondary_color: event.settings.theme.secondary_color,
      font_family: event.settings.theme.font_family,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const updated = await updateEvent(event.id, {
        settings: {
          ...event.settings,
          theme: values,
        },
      });
      
      if (!updated) {
        throw new Error("Failed to update design settings");
      }

      toast({
        title: "Success",
        description: "Design settings updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update design settings",
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
          name="primary_color"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4">
              <FormLabel className="min-w-32">Primary Color</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input {...field} type="color" className="w-16 h-10" />
                </FormControl>
                <Input {...field} className="w-32" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondary_color"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4">
              <FormLabel className="min-w-32">Secondary Color</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input {...field} type="color" className="w-16 h-10" />
                </FormControl>
                <Input {...field} className="w-32" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="font_family"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Family</FormLabel>
              <FormControl>
                <Input {...field} />
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