import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventFormData, eventSchema } from '@/types/event';
import { createEvent, checkSubdomainAvailability } from '@/lib/supabase/events';
import { useAuth } from './useAuth';
import { Event } from '@/types/events';

interface UseEventFormProps {
  onSuccess?: (data: Event | null) => void;
  onError?: (error: unknown) => void;
}

export const useEventForm = (
  { onSuccess, onError }: UseEventFormProps = {},
  defaultValues?: Partial<EventFormData>
) => {
  const { user } = useAuth();
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      type: 'BAR_MITZVAH',
      privacy: 'PRIVATE',
      max_guests: 100,
      ...defaultValues,
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    if (!user) {
      throw new Error('User must be logged in to create an event');
    }

    try {
      // Check subdomain availability
      const isAvailable = await checkSubdomainAvailability(formData.subdomain);
      if (!isAvailable) {
        form.setError('subdomain', {
          type: 'manual',
          message: 'This subdomain is already taken',
        });
        return;
      }

      // Serialize the form data
      const serializedData = {
        title: formData.title,
        description: formData.description,
        event_date: new Date(formData.date).toISOString(),
        location: `${formData.location.address}, ${formData.location.city}, ${formData.location.state} ${formData.location.zipCode}`,
        user_id: user.id,
        status: 'draft',
        privacy: formData.privacy,
        max_guests: formData.max_guests,
        subdomain: formData.subdomain,
        theme_config: {
          rsvp_enabled: false,
          theme: {
            primary_color: '#000000',
            secondary_color: '#ffffff',
            font_family: 'Inter',
          },
        },
      };

      // Convert to plain object
      const plainData = JSON.parse(JSON.stringify(serializedData));

      // Create event with serialized data
      const event = await createEvent(plainData);
      onSuccess?.(event);
    } catch (error) {
      console.error('Error submitting form:', error);
      onError?.(error);
      throw error;
    }
  });

  return {
    form,
    onSubmit: handleSubmit,
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
}; 