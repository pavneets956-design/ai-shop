# Available Routes

## Main Pages
- `/` - Homepage
- `/products` - Browse all products
- `/products/[id]` - Product detail page (example: `/products/1`)
- `/create` - Create new product
- `/dashboard` - Creator dashboard
- `/about` - About page
- `/login` - Login/Signup page

## AI Agent Pages
- `/agent` - AI Sales Agent dashboard
- `/agent/contacts` - Contact management
- `/agent/calls` - Call history
- `/agent/settings` - Agent settings
- `/agent/leads` - **Leads dashboard** ⭐
- `/agent/leads/[id]` - Individual lead detail (example: `/agent/leads/1`)

## Quick Access URLs

To preview the Lead Tracking System:
1. **Leads Dashboard**: http://localhost:3000/agent/leads
2. **Individual Lead**: http://localhost:3000/agent/leads/1
3. **Agent Dashboard**: http://localhost:3000/agent

## Troubleshooting 404 Errors

If you're getting a 404:

1. **Make sure the dev server is running:**
   ```bash
   npm run dev
   ```

2. **Check the URL is correct:**
   - No trailing slash needed
   - Use lowercase letters
   - Example: `/agent/leads` not `/Agent/Leads`

3. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

4. **Check the browser console:**
   - Press F12 to open developer tools
   - Look for any JavaScript errors

5. **Verify files exist:**
   - All route files should be in `app/` directory
   - File structure must match Next.js App Router conventions

## Testing Routes

Start from the homepage and navigate:
1. Go to http://localhost:3000
2. Click "Agent" in the navbar
3. Click "Leads" card on the agent dashboard
4. Click any lead to see detail page

