
# CaKer — Job Application Tracker

A web-based job discovery and application tracking tool built with HTML, CSS, and vanilla JavaScript.

CaKer was developed as an independent personal project to simplify the process of searching for jobs, organizing applications, and monitoring their progress in one place.

## Overview

Applying for multiple jobs can quickly become difficult to manage, especially when applications are spread across different websites.

CaKer brings job discovery and application tracking into a single interface. Users can explore job listings retrieved from an external API, manually record applications, and organize them according to their current recruitment status.

The project focuses on client-side development, asynchronous API integration, DOM manipulation, and browser-based data persistence.

## Features

### 1. Job Discovery
- Fetches job listings from the [Arbeitnow Job Board API](https://www.arbeitnow.com/api/job-board-api).
- Displays up to 10 job listings from the API response.
- Shows job titles, company names, employment types, and brief descriptions.
- Provides links to the original job postings.
- Allows users to save selected listings to their application tracker.

### 2. Application Management
- Manually add job applications.
- Record company names, positions, application dates, and personal notes.
- Assign an application status.
- Delete applications from the tracker.

### 3. Application Status Tracking

Organizes applications into four categories:

| Status | Description |
|--------|-------------|
| Applied | Application submitted |
| Interview | Progressed to interview stage |
| Offered | Received a job offer |
| Rejected | Application unsuccessful |

Users can update an application's status as they progress through the recruitment process.

### 4. Progress Dashboard
- Displays application counts for each status.
- Updates the displayed counts as applications are added or modified.
- Allows users to filter applications by status.

### 5. Local Data Persistence
- Uses the browser's `localStorage` to store application data.
- Serializes JavaScript objects into JSON for storage.
- Restores saved data when the application is reopened in the same browser.

No database or user account is required.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Application structure and forms |
| CSS3 | Layout, styling, and status indicators |
| JavaScript (ES6+) | Application logic and user interactions |
| Axios | HTTP requests to an external API |
| Arbeitnow API | External job listing data |
| localStorage | Client-side data persistence |

The application was developed without a frontend framework.

## How It Works

### Job Discovery

On initial loading, CaKer requests job listings from the Arbeitnow API using Axios.

The retrieved data is processed and displayed as dynamically generated job cards.

Users can view the original posting or add a listing to their tracker.

### Application Tracking

Applications are stored as JavaScript objects containing information such as:

- Company name
- Position title
- Application status
- Personal notes
- Application date

The application maintains separate collections for different recruitment statuses.

When a status is updated, the corresponding application is moved between collections, and the relevant interface elements are rendered again.

### Data Persistence

CaKer uses `JSON.stringify()` to save application data into `localStorage` and `JSON.parse()` to retrieve it.

This enables application information to persist across browser sessions without requiring a backend server.

## Technical Implementation

Several programming concepts were applied throughout development:

**Asynchronous Programming**
- Used `async/await` with Axios to retrieve external job listings.
- Implemented error handling for failed API requests.

**DOM Manipulation**
- Dynamically generated job cards and application entries.
- Updated dashboard counts and dropdown menus based on application data.
- Re-rendered elements following user interactions.

**Event Handling**
- Implemented event listeners for form submissions, application updates, filtering, and deletion.
- Used event delegation to handle interactions with dynamically generated elements.

**Data Management**
- Represented applications using JavaScript objects and arrays.
- Used array methods such as `map()`, `filter()`, and `find()` to manipulate application records.
- Used JSON serialization for browser storage.

## Project Structure

```text
CaKer/
├── index.html       # Main application interface
├── style.css        # Application styling
├── script.js        # Application logic and API integration
├── job-seeker.png   # Application logo
└── README.md        # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser
- Internet connection for retrieving external job listings

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/CaKer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CaKer
   ```

3. Open `index.html` in a web browser.

No package installation or build process is required.

**Note:** External job listings depend on the availability and browser accessibility of the Arbeitnow API.

## Current Limitations

CaKer is a personal frontend project rather than a production-ready application.

- Data is stored locally and is not synchronized between devices.
- There is no user authentication or backend database.
- The job discovery section displays only the first 10 returned listings.
- Some form handling and persistence behaviours require further refinement.
- The contact form is a frontend interface without an implemented messaging backend.

These limitations provide opportunities for future development.

## What I Learned

Building CaKer gave me practical experience in developing an interactive web application independently.

In particular, I gained experience with:

- Integrating a third-party REST API into a frontend application.
- Managing asynchronous operations and external data.
- Designing interactive interfaces using JavaScript.
- Organizing and updating application state.
- Persisting structured data within a browser.
- Connecting multiple application features into a single workflow.

The project helped me strengthen my understanding of how frontend components interact with application data and respond to user actions.

## Acknowledgements

Job listing data is provided by the [Arbeitnow Job Board API](https://www.arbeitnow.com/api/job-board-api).

Axios is used for HTTP requests.

## Author

**Mohd Danish Radzeem**

Computer Science Student  
University of British Columbia, Vancouver

Independent Personal Project
