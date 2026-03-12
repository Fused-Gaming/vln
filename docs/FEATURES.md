# VLN Features & Integrations

## Table of Contents
1. [Founder Meetup Popup](#founder-meetup-popup)
2. [Social Sharing](#social-sharing)
3. [Analytics](#analytics)
4. [API Endpoints](#api-endpoints)

---

## Founder Meetup Popup

### Overview
The Founder Meetup Popup is a non-intrusive modal that appears on the VLN homepage to invite founders to join the weekly VLN founder meetup at The Crybaby in Oakland, CA.

**Event Details:**
- **Venue:** The Crybaby (Craft Cocktail Bar)
- **Address:** 1928 Telegraph Ave, Oakland, CA 94612, United States
- **Recurring:** Every Wednesday
- **Time:** 5:00 PM – 7:00 PM PT
- **Target:** Founders, CTOs, Security Leaders, Blockchain Developers

### Component Location
- **Component:** `/components/vln/founder-meetup-popup.tsx`
- **Integration:** `/app/page.tsx` (Homepage)
- **Dedicated Page:** `/app/founder-meetup/page.tsx`

### Features
- ✅ Auto-show after delay (3s mobile, 5s desktop)
- ✅ 24-hour dismissal persistence via localStorage
- ✅ Social sharing (LinkedIn, Luma, Copy Link)
- ✅ VLN design system compliance
- ✅ Full accessibility (WCAG AA)
- ✅ Analytics tracking
- ✅ Responsive design
- ✅ Smooth animations (fade + slide-up)

### Customization Props
```typescript
interface FounderMeetupPopupProps {
  lumaEventUrl?: string; // Default: https://lu.ma/vlnfounders
  linkedInUrl?: string;  // Default: https://linkedin.com/company/vlngg
}
```

### Styling
All styling follows VLN design tokens:
- **Colors:** Matte Charcoal (#0f0f0f), Sage Green (#a6c3a7), Blue-Gray (#aab7c8)
- **Border Radius:** 12px (vln-radius)
- **Fonts:** Inter (primary), JetBrains Mono (technical)
- **Glow Effects:** `shadow-[0_0_8px_#a6c3a7]` on hover

### localStorage Keys
- **Key:** `vln_founder_meetup_dismissed`
- **Value:** Timestamp (milliseconds)
- **Duration:** 24 hours from dismissal

---

## Social Sharing

### Platforms Supported
1. **LinkedIn**
   - Share intent URL
   - Auto-formatted message
   - Tracked via analytics

2. **Luma**
   - Direct event link
   - Event management integration
   - Registration tracking

3. **Copy Link**
   - Clipboard API
   - Toast notification ("Copied!")
   - Shareable URL: `https://vln.gg/?ref=founder-meetup`

### Open Graph Metadata
The popup supports full OG metadata for social sharing:
```
og:title: "Join VLN Founders Network - Every Wednesday in Oakland"
og:description: "Connect with founders and builders at The Crybaby..."
og:image: "https://vln.gg/api/events/meetup/og" (dynamic)
og:url: "https://vln.gg/founder-meetup"
```

### Dedicated Sharing Page
- **Route:** `/founder-meetup`
- **Purpose:** Landing page for shared invites
- **Features:** Event details, what to expect, CTA buttons

---

## Analytics

### Tracked Events
| Event | Type | Platform | Details |
|-------|------|----------|---------|
| `impression` | View | - | Popup displayed to user |
| `dismiss` | Interaction | - | User closed popup |
| `join_click` | Conversion | Luma | User clicked join button |
| `share_click` | Engagement | LinkedIn/Luma/Copy | User shared event |
| `view_details` | Engagement | - | User viewed full details |

### Analytics Endpoint
- **Route:** `/api/events/meetup/analytics`
- **Method:** POST
- **Rate Limit:** 100 requests/minute per IP
- **Payload:**
  ```json
  {
    "event": "impression|dismiss|join_click|share_click",
    "platform": "linkedin|luma|copy_link",
    "source": "popup",
    "timestamp": "2024-03-12T10:00:00Z"
  }
  ```

### Admin Analytics Dashboard
- **Route:** `GET /api/events/meetup/analytics`
- **Auth:** Requires `x-admin-token` header
- **Response Includes:**
  - Total events
  - Impressions count
  - Dismissal rate
  - Conversion rate
  - Platform breakdown

---

## API Endpoints

### 1. GET /api/events/meetup
**Returns:** Meetup event configuration

**Response:**
```json
{
  "id": "vln-founder-meetup-oakland",
  "venue": "The Crybaby",
  "address": "1928 Telegraph Ave",
  "city": "Oakland",
  "state": "CA",
  "zip": "94612",
  "country": "United States",
  "coordinates": {
    "latitude": 37.8045,
    "longitude": -122.2721
  },
  "dayOfWeek": "Wednesday",
  "timeStart": "17:00",
  "timeEnd": "19:00",
  "timezone": "America/Los_Angeles",
  "externalLinks": {
    "luma": "https://lu.ma/vlnfounders",
    "linkedin": "https://linkedin.com/company/vlngg",
    "website": "https://vln.gg"
  }
}
```

**Cache:** 1 hour (s-maxage=3600)

### 2. POST /api/events/meetup/analytics
**Purpose:** Log user interaction events

**Request:**
```json
{
  "event": "impression|dismiss|join_click|share_click",
  "platform": "linkedin|luma|copy_link",
  "source": "popup",
  "timestamp": "2024-03-12T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "eventId": 123
}
```

**Status Codes:**
- `201` - Event logged successfully
- `400` - Invalid event type
- `429` - Rate limit exceeded
- `500` - Server error

### 3. GET /api/events/meetup/analytics (Admin)
**Purpose:** Retrieve analytics summary

**Headers Required:**
```
x-admin-token: <ADMIN_ANALYTICS_TOKEN>
```

**Response:**
```json
{
  "totalEvents": 1000,
  "impressions": 500,
  "dismissals": 150,
  "joinClicks": 50,
  "shareClicks": 300,
  "shareByPlatform": {
    "linkedin": 150,
    "luma": 100,
    "copyLink": 50
  },
  "conversionRate": "10.00",
  "dismissalRate": "30.00"
}
```

### 4. GET /api/events/meetup/og
**Purpose:** Generate dynamic Open Graph image

**Response:** PNG image (1200x630px)

**Image Features:**
- VLN branding
- Event details (date, time, location)
- Call-to-action text
- Sage green accents

---

## Environment Variables

```bash
# Analytics
ADMIN_ANALYTICS_TOKEN=<secure-token>

# External Services
LUMA_EVENT_URL=https://lu.ma/vlnfounders
LINKEDIN_COMPANY_URL=https://linkedin.com/company/vlngg
```

---

## Testing

### Unit Tests
- **File:** `__tests__/components/founder-meetup-popup.test.ts`
- **Coverage:** Rendering, interactions, localStorage, analytics

### API Tests
- **File:** `__tests__/api/meetup.test.ts`
- **Coverage:** Validation, rate limiting, security, performance

### Running Tests
```bash
pnpm test
pnpm test --coverage
```

---

## Deployment Notes

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Build succeeds (`pnpm build`)
- [ ] No console errors in production build
- [ ] Luma event URL is configured correctly
- [ ] LinkedIn company URL is up to date
- [ ] OG image is accessible
- [ ] Analytics endpoint is monitoring

### Performance Budget
- **Modal JS size:** < 15KB gzipped
- **API response time:** < 200ms
- **Animation smooth:** 60fps
- **Lighthouse impact:** No negative change

---

## Maintenance

### Updating Event Details
Edit `/components/vln/founder-meetup-popup.tsx` MEETUP_CONFIG:
```typescript
const MEETUP_CONFIG = {
  venue: "The Crybaby",
  address: "1928 Telegraph Ave",
  // ... other details
};
```

### Updating Event Links
Update in both:
1. Component props (if overriding defaults)
2. API endpoint (`/api/events/meetup`)

### Monitoring Analytics
```bash
# View analytics summary
curl -H "x-admin-token: <TOKEN>" https://vln.gg/api/events/meetup/analytics
```

### Clearing Analytics
```bash
# Clear all stored analytics
curl -X DELETE -H "x-admin-token: <TOKEN>" https://vln.gg/api/events/meetup/analytics
```

---

## Security Considerations

1. **XSS Prevention**
   - All user input sanitized via DOMPurify
   - No dangerouslySetInnerHTML used

2. **CSRF Protection**
   - API endpoints use Next.js CSRF middleware
   - POST requests require Content-Type header

3. **Rate Limiting**
   - Analytics endpoint limited to 100 req/sec per IP
   - Auto-cleanup of old rate limit entries

4. **Data Privacy**
   - No PII collected or stored
   - Analytics only tracks aggregated interactions
   - User agents and referrers logged but not exposed

5. **Link Security**
   - All external URLs hardcoded (not user-supplied)
   - `rel="noopener,noreferrer"` on external links
   - Luma and LinkedIn URLs verified

---

## Troubleshooting

### Popup not showing
- Check localStorage for dismissal key
- Verify JS is not erroring in console
- Check network tab for analytics failures

### Analytics not logging
- Verify `/api/events/meetup/analytics` is accessible
- Check rate limiting hasn't been triggered
- Verify Content-Type is `application/json`

### OG image not generating
- Check `/api/events/meetup/og` endpoint
- Verify fonts are available to server
- Check image size matches expectations (1200x630)

---

## Future Enhancements

- [ ] Database persistence for analytics (instead of in-memory)
- [ ] Weekly email digest of attendees
- [ ] RSVP functionality with email confirmations
- [ ] Past meetup photos/recap gallery
- [ ] Multiple location support (SF, LA, etc.)
- [ ] Virtual attendance option
- [ ] Post-meetup survey/feedback form

