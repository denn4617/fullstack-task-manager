# Full-Stack Task Manager

This project is a full-stack task manager application that showcases a web applications using multiple languages and frameworks. The backend is built with Python (Flask) and the frontend with React (TypeScript).

## Project Structure

```bash
fullstack-task-manager/
├── backend/
│   ├── app.py                  # Flask API
│   ├── requirements.txt        # Python dependencies.
│   └── tests/
│       └── test_app.py         # Unit tests for the API.
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── public/
    │   └── index.html          # Main HTML file.
    └── src/
        ├── api/                # API modules for backend interactions.
        │   ├── authApi.ts
        │   └── tasksApi.ts
        ├── components/
        │   ├── NavBar/
        │   │   ├── NavBar.tsx
        │   │   └── NavBar.module.css
        │   ├── TaskChart/
        │   │   ├── TaskChart.tsx
        │   │   └── TaskChart.module.css
        │   └── TaskList/
        │       ├── TaskList.tsx
        │       └── TaskList.module.css
        ├── pages/
        │   ├── Login/          # Login page
        │   │   ├── Login.tsx
        │   │   └── Login.module.css
        │   └── TaskManager/    # TaskManager page
        │       ├── TaskManager.tsx
        │       └── TaskManager.module.css
        ├── App.tsx             # Main container with routing.
        ├── index.tsx           # React entry point.
        └── global.css          # Global styles
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
