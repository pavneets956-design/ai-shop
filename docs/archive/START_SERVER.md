# Starting the Dev Server

## Problem: Port 3000 is Already in Use

If `http://localhost:3000` shows your other project, you have two options:

### Option 1: Use a Different Port (Recommended)

Start the server on a different port:

```bash
npm run dev -- -p 3001
```

Then access your AI Shop at: **http://localhost:3001**

### Option 2: Stop the Other Project First

1. Find the terminal where your other project is running
2. Press `Ctrl+C` to stop that server
3. Then run: `npm run dev` for this project

### Option 3: Kill the Process (Windows)

```powershell
# Find the process using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with the actual process ID)
taskkill /PID <PID> /F
```

Then start this project: `npm run dev`

## Quick Start

1. **Make sure you're in the correct directory:**
   ```bash
   cd "C:\Users\gillp\CascadeProjects\AI shop"
   ```

2. **Start the server:**
   ```bash
   npm run dev
   ```

3. **Check the terminal output** - it will show which port is being used:
   ```
   ✓ Ready in X.Xs
   ○ Local:        http://localhost:3000
   ```

4. **If port 3000 is busy**, Next.js will automatically use 3001, 3002, etc.

## Access Your Pages

Once the server is running, use the port shown in the terminal:

- Homepage: `http://localhost:XXXX/`
- Agent: `http://localhost:XXXX/agent`
- Leads: `http://localhost:XXXX/agent/leads`
- Lead Detail: `http://localhost:XXXX/agent/leads/1`

Replace `XXXX` with the actual port number (3000, 3001, etc.)

