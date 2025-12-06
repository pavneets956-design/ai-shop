# Lead Tracking System Preview Guide

## 🎯 How to View the Preview

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the Leads Dashboard:**
   - Go to: `http://localhost:3000/agent/leads`
   - Or click "Leads" button from the Agent dashboard at `/agent`

## 📊 What You'll See

### Leads Dashboard (`/agent/leads`)

**Top Metrics Bar:**
- Total Leads: 5
- This Month: +24
- Conversion: 20.0%
- Revenue: $99
- Pipeline: $396
- Hot Leads: 1

**Conversion Funnel:**
Visual funnel showing:
- New Leads (1) → Blue bar
- Qualified (1) → Cyan bar  
- Demo Scheduled (1) → Purple bar
- Converted (1) → Green bar

**View Modes:**
1. **Pipeline View (Default)** - Kanban board with 6 columns:
   - New (1 lead)
   - Qualified (1 lead)
   - Demo Scheduled (1 lead)
   - Follow Up (1 lead)
   - Converted (1 lead)
   - Not Interested (0 leads)

2. **List View** - Sortable table with all leads

**Search & Filters:**
- Search box to find leads by company/contact name
- Status filter buttons (All, New, Qualified, Demo Scheduled, etc.)

### Individual Lead Page (`/agent/leads/1`)

**Header Section:**
- Company name: "Tech Solutions Inc"
- Status badge: "Demo Scheduled" (purple)
- Lead score: ⭐ 85 (yellow/green)
- Quick actions: Call, Email, Schedule buttons

**Quick Stats Cards:**
- Calls Made: 1
- Last Contact: 2 hours ago
- Next Follow-up: Tomorrow, 2:00 PM
- Lead Age: 3 days

**Contact Information Panel:**
- Phone: +1 (555) 123-4567
- Email: john@techsolutions.com
- Company: Tech Solutions Inc
- Industry: Technology

**Timeline:**
- Lead Created (blue dot)
- Call Made (cyan dot) with transcript
- Scheduled Follow-up (purple dot)

**Tabs:**
1. **Overview** - Summary and next steps
2. **Calls** - Full call transcript with timestamps
3. **Notes** - Activity log

## 🎨 Design Features

- ✅ Dark minimal theme matching cosmos.so style
- ✅ Color-coded status badges
- ✅ Lead scoring with star ratings
- ✅ Interactive pipeline view
- ✅ Responsive design (mobile-friendly)
- ✅ Clean typography with light font weights

## 📝 Sample Data

The preview includes 5 mock leads:
1. Tech Solutions Inc - Demo Scheduled (Score: 85)
2. Medical Practice Group - Qualified (Score: 72)
3. Law Firm Associates - Follow Up (Score: 58)
4. Dental Care Center - New (Score: 45)
5. Real Estate Pro - Converted (Score: 95) - Revenue: $99

## 🔗 Navigation

- From Agent Dashboard: Click "Leads" card
- From Leads List: Click any lead card to view details
- Back button: Returns to leads list from detail page

## 🚀 Next Steps

Once you've reviewed the preview:
1. Connect to real database
2. Integrate with AI agent conversation engine
3. Auto-create leads from agent calls
4. Add real-time updates
5. Implement drag-and-drop for pipeline view
6. Add export functionality

---

**Note:** This is a preview with mock data. The UI is fully functional and ready to connect to your backend APIs.

