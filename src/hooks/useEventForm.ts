import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventFormData, eventSchema } from '@/types/event';
import { createEvent, checkSubdomainAvailability } from '@/lib/supabase/events';
import { useAuth } from './useAuth';

interface UseEventFormProps {
  onSuccess?: (data: EventFormData) => void;
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
      const event = await createEvent(data, user.id);
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