import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventFormData, eventSchema } from '@/types/event';

interface UseEventFormProps {
  onSuccess?: (data: EventFormData) => void;
  onError?: (error: unknown) => void;
}

export const useEventForm = (
  { onSuccess, onError }: UseEventFormProps = {},
  defaultValues?: Partial<EventFormData>
) => {
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
    try {
      // TODO: Implement event creation/update logic with Supabase
      console.log('Form data:', data);
      onSuccess?.(data);
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