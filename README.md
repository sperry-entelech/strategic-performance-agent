# Strategic Performance Agent - Production Version

A modern, shareable web application for strategic daily briefing with beautiful UI and cloud deployment capabilities. Transform evening reflections into strategic morning directives with AI-powered intelligence.

![Strategic Performance Agent](https://img.shields.io/badge/Built%20with-Next.js%2014-black?logo=next.js) ![](https://img.shields.io/badge/UI-shadcn%2Fui-blue) ![](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css) ![](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

## 🌟 Features

### ✨ Modern, Beautiful Interface
- **Premium Dark Mode UI**: Professional gradient design optimized for evening/morning use
- **shadcn/ui Components**: Accessible, customizable components with smooth animations
- **Responsive Design**: Perfect experience across desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth hover effects, animated icons, and engaging micro-interactions

### 🧠 Intelligent Brief Generation
- **TNT Workload Adaptation**: Light, Moderate, Heavy, and Critical day job intensity levels
- **CLEAR Framework Integration**: Context-aware strategic directive generation
- **Energy Optimization**: Matches task complexity to predicted energy levels
- **Smart Delegation**: Automatic partner coordination suggestions for heavy days

### 📊 Advanced Features
- **Real-time Progress Tracking**: Visual completion indicators and percentage tracking
- **Export Capabilities**: PDF export and data backup functionality
- **Quality Feedback System**: 5-star rating system for continuous improvement
- **Auto-save**: Never lose your journal entries with automatic saving

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your application.

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"

# Supabase (recommended)
SUPABASE_URL="your_supabase_project_url"
SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"
```

## 🌐 Production Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/daily-brief-pro.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure optimal settings
   - Add your environment variables in Vercel dashboard

3. **Database Setup (Supabase)**
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Copy connection details to Vercel environment variables
   - Run the database schema (see Database Schema section)

### Alternative Deployment Options

#### Netlify
```bash
npm run build
# Deploy the .next folder to Netlify
```

#### Railway
```bash
# Connect GitHub repo to Railway
# Railway auto-detects Next.js and deploys
```

## 🗄️ Database Schema

### PostgreSQL Schema (Supabase)

```sql
-- Users table (handled by Supabase Auth)
-- No manual setup required

-- Journal entries
CREATE TABLE journal_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
    energy_qualifier TEXT,
    available_hours DECIMAL(3,1),
    time_constraints TEXT,
    tnt_workload TEXT CHECK (tnt_workload IN ('Light', 'Moderate', 'Heavy', 'Critical')),
    tnt_description TEXT,
    market_opportunities TEXT,
    completion_status BOOLEAN DEFAULT FALSE,
    blocker_description TEXT,
    priority_concerns TEXT,
    partner_coordination BOOLEAN DEFAULT FALSE,
    coordination_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated strategic briefs
CREATE TABLE generated_briefs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    journal_id UUID REFERENCES journal_entries(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    primary_directive TEXT NOT NULL,
    supporting_activities JSONB,
    partner_delegations JSONB,
    alternatives JSONB,
    complexity_rating TEXT,
    estimated_duration DECIMAL(3,1),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brief feedback for continuous improvement
CREATE TABLE brief_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brief_id UUID REFERENCES generated_briefs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
    feedback_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE brief_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can only see their own journal entries" ON journal_entries
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own briefs" ON generated_briefs
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own feedback" ON brief_feedback
    FOR ALL USING (auth.uid() = user_id);
```

## 🎨 UI Components

### Key Components Built

- **Homepage**: Hero section with gradient backgrounds and feature cards
- **Journal Form**: Multi-section form with TNT workload integration
- **Brief Display**: Dashboard-style layout with progress tracking
- **Interactive Elements**: Sliders, checkboxes, star ratings, progress bars

## 🚀 Share with Friends

### Quick Deployment Steps
1. **Fork this repository** to your GitHub account
2. **Connect to Vercel** - Import from GitHub at vercel.com
3. **Set up database** - Create free Supabase project and add connection details
4. **Share your URL** - Your app will be live at `https://your-app-name.vercel.app`

### Demo Features
- Beautiful landing page showcasing the Strategic Performance Agent concept
- Interactive journal form with TNT workload intelligence
- Morning brief dashboard with progress tracking
- Mobile-responsive design that works perfectly on phones

---

**Ready to optimize strategic performance?** Deploy this app and share it with friends to transform their daily planning with AI-powered intelligence!
