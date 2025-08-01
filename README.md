# QMS Event Management Module

This project is a full-stack Quality Management System (QMS) module for a Life Sciences company, developed to demonstrate full-stack development capabilities, understanding of QMS principles, and AI integration. The application allows users to create, view, and manage QMS audit events with the help of an intelligent AI assistant powered by Google Gemini.

**Submission Date:** August 1, 2025

---

## 🛠️ Tech Stack

| Area      | Technology                                                      |
|-----------|-----------------------------------------------------------------|
| Frontend  | React, Vite, Redux Toolkit, React Router, Tailwind CSS, Axios   |
| Backend   | Python, FastAPI, SQLModel                                       |
| Database  | SQLite                                                          |
| AI Model  | Google Gemini 2.5 Flash                                         |

---

## ✨ Core Features

* **Wizard-Style Audit Creation:** A pixel-perfect, 5-step guided wizard for logging new QMS audit events.
* **Dynamic Event Listing:** A real-time list of all QMS events, fetched from the backend.
* **Custom Audit ID Generation:** Automatic, structured ID generation on the backend (e.g., `AUD-INT-001`).
* **Client-Side Filtering & Sorting:** Interactive headers for sorting and a filter panel for searching events.
* **AI-Powered Assistant:** An integrated chat assistant powered by Google Gemini to provide intelligent insights and perform specific tasks.

---

## 🚀 How to Run and Use the Project

### Step 1: Setup and Run the Application

#### Prerequisites
* Python 3.8+
* Node.js 18+ and npm
* A Google Gemini API Key

#### Backend Setup
1.  **Navigate to the backend directory:** `cd backend`
2.  **Create and activate a virtual environment:**
    * On Windows: `python -m venv venv` followed by `venv\Scripts\activate`
    * On macOS/Linux: `python3 -m venv venv` followed by `source venv/bin/activate`
3.  **Install dependencies:** `pip install -r requirements.txt`
4.  **Create a `.env` file** in the `backend` directory and add your API key: `GEMINI_API_KEY="YOUR_API_KEY_HERE"`
5.  **Run the FastAPI server:** `uvicorn main:app --reload`
    * The backend will be running at `http://localhost:8000`.

#### Frontend Setup
1.  **Navigate to the frontend directory:** `cd frontend`
2.  **Install dependencies:** `npm install`
3.  **Run the Vite development server:** `npm run dev`
    * The frontend will be running at `http://localhost:5173`.

### Step 2: Using the Application
1.  **Create a New Audit:** Open `http://localhost:5173`, click **"Schedule New Audit"**, and fill out the 5-step wizard.
2.  **View and Sort Audits:** Your new audit will appear in the table. Click on table headers like "Audit ID" or "Title" to sort the data.
3.  **Interact with the AI Assistant:** Use the suggestion buttons or type your own questions in the right-hand panel.

---

## 🤖 Detailed AI Assistant Capabilities

The AI assistant uses Google Gemini's function-calling feature to provide accurate, tool-based responses. This is more reliable than simple text generation as it forces the AI to use a predefined set of capabilities.

### Implemented AI Tools & Usage:

* **`Identify Trends`**: Analyzes the entire dataset to provide high-level insights on audit distribution and resource allocation.
    * **Usage:** Click the "Identify Trends" prompt or type `"show me trends"`.

* **`Filter by Status`**: Allows users to quickly segment the audit list to focus on specific stages of the QMS lifecycle.
    * **Usage:** Click the "Filter by 'Planned'" prompt or type `"show me all closed events"`.

* **`Summarize Single Audit`**: Provides a quick, detailed summary of a specific audit on demand.
    * **Usage:** Click the "Summarize by ID" prompt and enter an ID, or type `"summarize event 2"`.

* **`List Personnel`**: Quickly retrieves all stakeholders for a specific audit, improving communication.
    * **Usage:** Click the "List Personnel by ID" prompt and enter an ID, or type `"who is on the team for audit 1?"`.

* **`Suggest Next Steps`**: Provides actionable, context-aware recommendations for a specific audit, helping guide users through the process.
    * **Usage:** Type `"what are the next steps for audit 2?"`.

* **`Suggest Root Cause`**: Leverages the AI's reasoning to suggest potential root causes for an audit finding, accelerating the investigation phase.
    * **Usage:** Type `"suggest root cause for audit 1"`.

* **`Find Similar Events`**: Helps identify recurring issues by finding historical audits with similar scopes or titles.
    * **Usage:** Type `"find events similar to event 1"`.

* **`Draft Kick-off Email`**: Automates a common administrative task, saving time and ensuring professional, consistent communication.
    * **Usage:** Click the "Draft Kick-off by ID" prompt and enter an ID, or type `"draft an email for audit 2"`.

---

## 📝 Discussion Points

### Understanding of QMS & Design Rationale

A Quality Management System in Life Sciences is crucial for ensuring product quality, patient safety, and regulatory compliance. The design of this application was guided by the core QMS principles of **traceability, data integrity, and risk management**.

* **Structured Audit ID (`AUD-INT-001`):** This feature directly supports **traceability**. The unique, predictable ID format allows any event to be instantly classified and tracked throughout its lifecycle, which is a fundamental requirement for regulatory bodies like the FDA.

* **Wizard-Style Event Creation:** This design choice enhances **data integrity**. By guiding the user through a required set of steps, it minimizes the risk of incomplete or erroneous data entry, ensuring that every record is compliant from the moment of creation.

* **AI as a Decision-Support Tool:** The AI assistant promotes proactive **risk management and efficiency**. Tools like `Suggest Root Cause` and `Find Similar Events` empower quality professionals to analyze potential issues faster and identify recurring problems, moving from a reactive to a proactive quality culture.

### Architecture and Technology Choices

* **FastAPI (Backend):** Chosen for its high performance and automatic data validation through Pydantic type hints. This enforces a strict schema for incoming data, which is critical for maintaining data integrity in a regulated system.
* **React with Vite (Frontend):** React's component-based architecture is ideal for building a complex and maintainable UI like the wizard. Vite was selected for its superior developer experience and fast Hot Module Replacement (HMR).
* **Redux Toolkit (State Management):** Used to manage a centralized, single source of truth for application state (like the event list and AI conversation). This prevents data inconsistencies and simplifies the data flow.
* **SQLModel (Database Interaction):** Selected to reduce code duplication by combining the API's data validation schema and the database's table schema into a single class, enforcing consistency between the API and the database.

### Challenges Faced

* **AI Tool Integration:** A recurring `500 Internal Server Error` was traced to a `TypeError` within the Gemini library. The root cause was that the library's function-calling mechanism could not automatically serialize complex custom objects from our database. The solution was to refactor the AI tools to only accept simple data types (like `string` and `int`) and then manually inject the database context within the backend logic. This made the integration robust and reliable.
* **UI Fidelity:** Ensuring the React components were a pixel-perfect match to the static HTML mockups required careful migration of custom CSS classes and precise application of Tailwind utilities, especially for the multi-step wizard indicator. This was solved by creating a definitive `index.css` file that directly mirrored the styles from the source mockups.

### Future Improvements

* **Backend Filtering/Sorting:** The current implementation uses client-side filtering and sorting. For larger datasets, this should be moved to the backend with API endpoints that accept sort and filter parameters (e.g., `/api/events?sort_by=title&status=planned`) to improve performance.
* **Authentication:** Implement user authentication (e.g., using JWT) to secure the application, create audit trails of user actions, and associate events with specific owners.
* **Detail Page:** Build the "Event Detail Page" that was out of scope for this task, allowing users to click on an audit in the list to see and edit its full details.