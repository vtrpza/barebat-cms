'use client';

import { useEventForm } from '@/hooks/useEventForm';
import { EventFormData } from '@/types/event';
import * as Form from '@radix-ui/react-form';
import * as Label from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';

interface EventFormProps {
  defaultValues?: Partial<EventFormData>;
}

export const EventForm = ({ defaultValues }: EventFormProps) => {
  const router = useRouter();
  const { form, onSubmit, isSubmitting, errors } = useEventForm(
    {
      onSuccess: (data) => {
        console.log('Event created:', data);
        router.push('/dashboard/events');
      },
      onError: (error) => {
        console.error('Error creating event:', error);
      },
    },
    defaultValues
  );
  const { register } = form;

  return (
    <Form.Root onSubmit={onSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>
        
        <Form.Field name="title">
          <div className="flex items-baseline justify-between">
            <Label.Root className="text-sm font-medium">Event Title</Label.Root>
            {errors.title && (
              <Form.Message className="text-sm text-red-500">
                {errors.title.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <input
              {...register('title')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="Enter event title"
            />
          </Form.Control>
        </Form.Field>

        <div className="grid grid-cols-2 gap-4">
          <Form.Field name="type">
            <Label.Root className="text-sm font-medium">Event Type</Label.Root>
            <Form.Control asChild>
              <select
                {...register('type')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="BAR_MITZVAH">Bar Mitzvah</option>
                <option value="BAT_MITZVAH">Bat Mitzvah</option>
              </select>
            </Form.Control>
          </Form.Field>

          <Form.Field name="date">
            <div className="flex items-baseline justify-between">
              <Label.Root className="text-sm font-medium">Event Date</Label.Root>
              {errors.date && (
                <Form.Message className="text-sm text-red-500">
                  {errors.date.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                type="datetime-local"
                {...register('date')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </Form.Control>
          </Form.Field>
        </div>

        <Form.Field name="description">
          <div className="flex items-baseline justify-between">
            <Label.Root className="text-sm font-medium">Description</Label.Root>
            {errors.description && (
              <Form.Message className="text-sm text-red-500">
                {errors.description.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <textarea
              {...register('description')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              rows={4}
              placeholder="Enter event description"
            />
          </Form.Control>
        </Form.Field>
      </div>

      {/* Location Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Location Information</h3>
        
        <Form.Field name="location.address">
          <div className="flex items-baseline justify-between">
            <Label.Root className="text-sm font-medium">Address</Label.Root>
            {errors.location?.address && (
              <Form.Message className="text-sm text-red-500">
                {errors.location.address.message}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <input
              {...register('location.address')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="Street address"
            />
          </Form.Control>
        </Form.Field>

        <div className="grid grid-cols-3 gap-4">
          <Form.Field name="location.city">
            <div className="flex items-baseline justify-between">
              <Label.Root className="text-sm font-medium">City</Label.Root>
              {errors.location?.city && (
                <Form.Message className="text-sm text-red-500">
                  {errors.location.city.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                {...register('location.city')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="City"
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="location.state">
            <div className="flex items-baseline justify-between">
              <Label.Root className="text-sm font-medium">State</Label.Root>
              {errors.location?.state && (
                <Form.Message className="text-sm text-red-500">
                  {errors.location.state.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                {...register('location.state')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="ST"
                maxLength={2}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="location.zipCode">
            <div className="flex items-baseline justify-between">
              <Label.Root className="text-sm font-medium">ZIP Code</Label.Root>
              {errors.location?.zipCode && (
                <Form.Message className="text-sm text-red-500">
                  {errors.location.zipCode.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                {...register('location.zipCode')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="12345"
              />
            </Form.Control>
          </Form.Field>
        </div>
      </div>

      {/* Event Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Event Settings</h3>

        <div className="grid grid-cols-2 gap-4">
          <Form.Field name="privacy">
            <Label.Root className="text-sm font-medium">Privacy</Label.Root>
            <Form.Control asChild>
              <select
                {...register('privacy')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="PRIVATE">Private</option>
                <option value="PUBLIC">Public</option>
                <option value="UNLISTED">Unlisted</option>
              </select>
            </Form.Control>
          </Form.Field>

          <Form.Field name="max_guests">
            <div className="flex items-baseline justify-between">
              <Label.Root className="text-sm font-medium">Max Guests</Label.Root>
              {errors.max_guests && (
                <Form.Message className="text-sm text-red-500">
                  {errors.max_guests.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                type="number"
                {...register('max_guests', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                min={1}
              />
            </Form.Control>
          </Form.Field>
        </div>

        <Form.Field name="subdomain">
          <div className="flex items-baseline justify-between">
            <Label.Root className="text-sm font-medium">Subdomain</Label.Root>
            {errors.subdomain && (
              <Form.Message className="text-sm text-red-500">
                {errors.subdomain.message}
              </Form.Message>
            )}
          </div>
          <div className="flex items-center">
            <Form.Control asChild>
              <input
                {...register('subdomain')}
                className="mt-1 block w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="your-event"
              />
            </Form.Control>
            <span className="mt-1 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500">
              .barebat.com
            </span>
          </div>
        </Form.Field>
      </div>

      <Form.Submit asChild>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating Event...' : 'Create Event'}
        </button>
      </Form.Submit>
    </Form.Root>
  );
}; 