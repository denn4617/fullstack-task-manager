# Full-Stack Task Manager

This project is a full-stack task manager application that showcases a web applications using multiple languages and frameworks. The backend is built with Python (Flask) and the frontend with React (TypeScript).

## Project Structure

```bash
fullstack-task-manager/
├── README.md
├── backend/
│   ├── app.py                # Flask API with tasks and login endpoints.
│   ├── requirements.txt      # Python dependencies.
│   └── tests/
│       └── test_app.py       # Unit tests for the API.
└── frontend/
    ├── package.json          # Node dependencies and scripts.
    ├── tsconfig.json         # TypeScript configuration.
    ├── public/
    │   └── index.html        # Main HTML file.
    └── src/
        ├── App.tsx           # Main container with routing.
        ├── index.tsx         # React entry point.
        ├── api.ts            # API module for backend interactions.
        └── components/
            ├── Login.tsx     # Login page component.
            ├── Login.css     # Styling for login page.
            ├── TaskItem.tsx  # Task item component.
            ├── TaskManager.tsx  # Task manager component.
            └── TaskManager.css  # Styling for the TaskManager.

```

## How to Run

### Backend (Python Flask)

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate the virtual environment:

**Linux/macOS:**

```bash
python -m venv venv
source venv/bin/activate
```

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the Flask application:

```bash
python app.py
```

The API will be available at `http://localhost:5000`.

5. Run the tests:

```bash
python -m unittest discover tests
```

### Frontend (React with TypeScript)

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The app will run at `http://localhost:3000`.
