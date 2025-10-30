# Mo-Data Builder Project

A web application that enables businesses to generate AI-powered reports with visualizations from Excel and Google Sheets files.

## What It Does

MoData transforms raw Excel data into actionable insights by:
- Accepting Excel file uploads (.xlsx, .xls)
- Generating visual reports with customizable chart types (bar, line, pie)
- Storing and managing generated reports with a user-friendly interface
- Providing downloadable PDF reports for business analysis

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account (for backend storage)

### Environment Variables
Create a `.env.local` file in the root directory with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/rube11/Mo-Data-builder-project.git
   cd mo-data
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run the database migration:
     ```bash
     npx supabase db push
     ```
   - Create a storage bucket named `excel-files` in your Supabase dashboard
   - Configure public access policies for the storage bucket

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## Key Features and Functionality

### Multi-Step Report Generation
- **Step 1: Report Details** - Enter report title and select chart type
- **Step 2: Upload Data** - Upload Excel files with drag-and-drop interface
- **Step 3: Generate** - Add optional focus/description and generate report

### Data Visualization
- Three chart types: Bar, Line, and Pie charts
- Visual previews with placeholder graphics
- Responsive card-based layout for viewing reports

### Report Management
- View all generated reports in grid or table view
- Delete unwanted reports with confirmation
- Download generated PDF reports
- Real-time updates using Supabase

### Responsive Design
- Mobile-friendly navigation with hamburger menu
- Adaptive layouts for all screen sizes
- Custom Tailwind CSS v4 configuration with Poppins and Kanit fonts

### Backend Integration
- Supabase PostgreSQL database for report metadata
- Supabase Storage for Excel file uploads
- Row Level Security (RLS) policies for data protection
- JSON export functionality to local storage

## Tech Stack

- **Frontend**: Next.js 15.5.6, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **Backend**: Supabase (PostgreSQL + Storage)
- **Fonts**: Poppins (headers), Kanit (body text)

## Assumptions and Limitations

### Assumptions
- Users have valid Excel files (.xlsx or .xls format)
- Excel files contain structured tabular data suitable for visualization
- Users have basic understanding of chart types and their use cases
- Supabase project is properly configured with storage buckets

### Current Limitations
- **Chart Generation**: Currently uses placeholder images; actual chart generation from Excel data is not yet implemented
- **File Processing**: Excel file parsing and data extraction functionality is pending
- **AI Integration**: AI-powered analysis and insights generation is not yet active
- **Authentication**: No user authentication system; all data is publicly accessible (suitable for demo/development only)
- **File Size**: Limited by Supabase storage quotas (default: 50MB per file)
- **Chart Types**: Only three chart types supported (bar, line, pie)
- **Data Validation**: Minimal validation on uploaded Excel file contents
- **Export Formats**: Only PDF download is available (placeholder)

### Known Issues
- Mobile menu may not close automatically on all navigation actions
- Footer positioning may require adjustment on very small screens
- Navbar may overlap content at specific screen widths (768px-900px range)

## Future Enhancements

- [ ] Implement actual Excel file parsing using libraries like `xlsx` or `exceljs`
- [ ] Generate real charts from data using Chart.js or D3.js
- [ ] Add AI-powered insights and trend analysis
- [ ] Implement user authentication and authorization
- [ ] Support for Google Sheets integration
- [ ] Additional chart types (scatter, area, radar, etc.)
- [ ] Export to multiple formats (PNG, CSV, Excel)
- [ ] Collaborative features and report sharing
- [ ] Dashboard with analytics and usage statistics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms specified in the LICENSE file.

## Contact

For questions or support, contact: support@modata.com
