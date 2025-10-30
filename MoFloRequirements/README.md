# Mo-Data Builder Project

A web integration that enables businesses to generate AI-powered reports with visualizations from Excel and Google Sheets files.

## What It Does

- MoData Gathers Excel sheets, Title, Graph type, and a short description over what kind of data report they would like
- it is then stores in a supabase backend where the generations are filled by placeholders
- generated reports can be managed in the view data tab


## Setup and Installation

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn package manager
- Supabase account (for backend storage)

### Environment Variables
Create a `.env.local` file in the root directory with:
env{
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
}

### Installation Steps

1. **Clone the repository**
   git clone https://github.com/rube11/Mo-Data-builder-project
   cd mo-data
   

2. **Install dependencies**
   npm install 

3. **Set up Supabase**
   - Create a Supabase project at supabase.com(https://supabase.com)
   - Run the database migration:

     npx supabase db push

   - Create a storage bucket named `excel-files` in your Supabase dashboard
   - Configure public access policies for the storage bucket

4. **Run the development server**
   npm run dev


5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## Key Features and Functionality

### Data Generation
- upload xlsx files 
- gather data from the user
- store it in a supabase schema

### Report Management
- View all generated reports in grid or table view
- Delete unwanted reports with confirmation
- Download generated PDF reports
- Real-time updates using Supabase

### Backend Integration
- Row Level Security (RLS) policies for data protection
- JSON export functionality to local storage

## Assumptions and Limitations

### Assumptions
- Users have valid Excel files (.xlsx or .xls format)

### Current Limitations
- No AI or Chart Generation
- No User Authentication 

