# Troubleshooting 404 Error

## ✅ Step-by-Step Navigation Guide

### Step 1: Start from Homepage
1. Open browser
2. Go to: **http://localhost:3000**
3. You should see the AI SHOP homepage

### Step 2: Navigate to Agent Dashboard
**Option A:** Click "Agent" link in the top navigation bar

**Option B:** Type directly in browser: **http://localhost:3000/agent**

### Step 3: Navigate to Leads Page
**Option A:** From Agent dashboard, click the "Leads" card

**Option B:** Type directly: **http://localhost:3000/agent/leads**

### Step 4: View Individual Lead
**Option A:** From Leads page, click any lead card

**Option B:** Type directly: **http://localhost:3000/agent/leads/1**

## 🔍 Common Issues

### Issue 1: Server Not Running
**Solution:**
```bash
npm run dev
```
Wait for: "Ready on http://localhost:3000"

### Issue 2: Wrong URL Format
✅ Correct: `http://localhost:3000/agent/leads`
❌ Wrong: `http://localhost:3000/agent/leads/`
❌ Wrong: `http://localhost:3000/Agent/Leads`

### Issue 3: Browser Cache
**Solution:**
- Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac) for hard refresh
- Or clear browser cache completely

### Issue 4: Port Conflict
**Solution:**
If port 3000 is busy, Next.js will use 3001, 3002, etc.
Check the terminal output for the actual port number.

## 📋 Quick Test Checklist

- [ ] Dev server is running (`npm run dev`)
- [ ] Homepage loads: http://localhost:3000
- [ ] Agent page loads: http://localhost:3000/agent
- [ ] Leads page loads: http://localhost:3000/agent/leads
- [ ] Lead detail loads: http://localhost:3000/agent/leads/1

## 🆘 Still Getting 404?

1. **Check browser console (F12):**
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **Check terminal output:**
   - Look for compilation errors
   - Look for route warnings

3. **Verify file structure:**
   - Files should be in: `app/agent/leads/page.tsx`
   - Dynamic routes: `app/agent/leads/[id]/page.tsx`

## 📞 Exact URLs to Try

Copy and paste these exact URLs in your browser:

1. Homepage: `http://localhost:3000`
2. Agent: `http://localhost:3000/agent`
3. Leads: `http://localhost:3000/agent/leads`
4. Lead Detail: `http://localhost:3000/agent/leads/1`

Make sure there are **no spaces** and use **lowercase** letters.

