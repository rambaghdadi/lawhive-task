# lawhive-task

## Development

### Step 1
1. Clone Repository
2. Make sure you have docker desktop installed

### Step 2
1. Open terminal
2. In the root directory, run `docker compose up`

### Step 3
1. Open terminal
2. In the backend directory `cd lawhive-backend`, run `npm install` and `npm run dev`

### Step 4
1. Open terminal
2. In the frontend directory `cd lawhive-frontend`, run `npm install` and `npm run dev`

Note: In order to use solicitor functionality - such as creating new jobs, simply sign in using any email/password. Since the db runs on a local machine, and to streamline the application for its intended purpose, the sigin API creates a new solicitor user if none exists. 

## Improvements
- Introduce new functionality (i.e go the extra mile), although I wanted to stay true to the requirments of the task
- Design Improvmements
- Introduce Animations

## Weaknesses / TradeOffs
- Commit messages weren't detailed enough
- No unit testing - although E2E testing was carried out
- Either backend or frontend validation was used on the forms, not both due to time, although different appraoches throughout the code base were taken to showcase skills
- Not enough time to implement Story 5 - although my approach can be discussed in the follow up call. I would probably end up using Pupetteer or a similar package to scrape the article
- The backend code (express) should have used Typescript

