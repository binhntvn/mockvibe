# SoleMate E-Commerce Application

This is a full-featured e-commerce application for SoleMate, a shoe retailer.

## Technology Stack

*   **Frontend**: React.js, Vite, TypeScript, shadcn/ui
*   **Backend**: FastAPI, Python, SQLAlchemy
*   **Database**: Supabase (PostgreSQL)

## Getting Started

### Prerequisites

*   Node.js and npm
*   Python 3.8+ and pip
*   A Supabase account and project

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Configure the backend:**
    *   Navigate to the `backend` directory: `cd backend`
    *   Create a `.env` file and add your Supabase database connection string:
        ```
        DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.<your-project-ref>.supabase.co:5432/postgres"
        SECRET_KEY="your-secret-key"
        ```
    *   Install the Python dependencies: `pip install -r requirements.txt`

3.  **Configure the frontend:**
    *   Navigate to the `frontend` directory: `cd frontend`
    *   Create a `.env` file and add your Supabase project details:
        ```
        VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"
        VITE_SUPABASE_PUBLISHABLE_KEY="<your-anon-key>"
        ```
    *   Install the Node.js dependencies: `npm install`

### Running the Application

1.  **Start the backend server:**
    *   Navigate to the `backend` directory.
    *   Run the command: `uvicorn main:app --reload --host 0.0.0.0`

2.  **Start the frontend development server:**
    *   Navigate to the `frontend` directory.
    *   Run the command: `npm run dev`

### Deployment

A `deploy.sh` script is provided to build the frontend and run both servers.

```bash
./deploy.sh
```

This script will:
1.  Build the frontend application.
2.  Start the FastAPI backend server.
3.  Serve the built frontend using a simple Python HTTP server.

For a production deployment, you would typically use a more robust setup, such as deploying the backend to a cloud provider and the frontend to a static hosting service like Vercel or Netlify.
