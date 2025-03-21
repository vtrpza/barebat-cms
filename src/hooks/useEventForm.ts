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
      maxGuests: 100,
      ...defaultValues,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!user) {
      throw new Error('User must be logged in to create an event');
    }

    try {
      // Check subdomain availability
      const isAvailable = await checkSubdomainAvailability(data.subdomain);
      if (!isAvailable) {
        form.setError('subdomain', {
          type: 'manual',
          message: 'This subdomain is already taken',
        });
        return;
      }

      // Create event
      const event = await createEvent({
        ...data,
        location: `${data.location.address}, ${data.location.city}, ${data.location.state} ${data.location.zipCode}`,
        user_id: user.id,
        status: 'draft',
        settings: {
          rsvp_enabled: false,
          max_guests: data.maxGuests,
          theme: {
            primary_color: '#000000',
            secondary_color: '#ffffff',
            font_family: 'Inter',
          },
        },
      });
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