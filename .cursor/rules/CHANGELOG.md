# Changelog

## [2024-03-21] - Foundation Complete ✓

### Added
- Next.js + TypeScript setup
- Supabase integration
- Authentication system
- Basic dashboard structure
- Code quality tools

## [2024-03-22] - Lean MVP Plan

### Week 1: Core Event + Builder.io
- Single template system
- Fixed sections:
  - Hero (image + title)
  - Event details
  - RSVP button
  - Gift list
- Builder.io basic integration
- Theme customization (colors/fonts only)

### Week 2: Simple Subdomains + RSVP
- [eventname].barebat.com routing
- Basic Next.js middleware
- Minimal RSVP form:
  - Name
  - Email
  - Guest count
- Simple CSV export

### Week 3: Gift Registry + Stripe
- Fixed gift amounts
- Direct Stripe checkout
- Basic commission tracking
- Simple payment flow

## Database Schema

```sql
events
  id
  slug
  builder_data
  basic_info

rsvps
  id
  event_id
  guest_info

gifts
  id
  event_id
  amount
  stripe_id
```

## Technical Decisions

### Shortcuts for Speed
1. Builder.io
   - Single template only
   - No custom components
   - Basic theme customization

2. Subdomains
   - Basic middleware
   - Skip custom domains
   - Skip SSL handling

3. Gift Registry
   - Fixed gift amounts
   - Direct checkout
   - Skip gift lists/items

4. RSVP
   - Minimal fields
   - No dietary info
   - Simple CSV export

### Deferred for v1.1+
- Analytics
- Custom domains
- Shopping cart
- Guest grouping
- Real-time updates
- Multiple templates
- Advanced customization 