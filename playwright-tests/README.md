
# Playwright Testing Suite for Rallly

This repository contains an automated testing suite for Rallly using [Playwright](https://playwright.dev/). The tests cover key functionalities such as creating group polls, managing participants, and modifying polls.

## Table of Contents
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [How to Run Tests](#how-to-run-tests)
- [Design Choices](#design-choices)
- [Future Improvements](#future-improvements)

---

## Project Structure

Here's an overview of the project's file structure and its purpose:

```
├── helpers
│   └── polls-ui.js        # Utility functions for poll-related UI actions
├── selectors
│   └── poll-page.js       # Centralized selectors for the poll page
├── setup
│   ├── commands
│   │   └── add-participants.js  # Command for API-based participant voting
│   └── endpoints
│       └── participants.js      # API helper methods for polls and participants
├── tests
│   ├── create-group-poll.spec.js      # Tests for creating group polls
│   ├── modify-participant.spec.js     # Tests for managing participant actions
│   ├── modify-poll.spec.js            # Tests for poll management features
│   └── participant-poll.spec.js       # Tests for participant interactions
├── playwright.config.js               # Playwright configuration
├── package.json                       # Dependencies and scripts
└── README.md                          # Project documentation
```

---

## Setup Instructions

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (version 16 or higher).
2. Clone this repository:  
   ```bash
   git clone https://github.com/Rodney-glitch/rallly.git
   cd rallly
   cd playwright-tests
   ```

3. Install dependencies:  
   ```bash
   npm install
   ```

4. Start the local server for Rallly:
   - Navigate to the root folder of the Rallly project.
   - Follow the instructions in Rallly's `README.md` to run the development server:  
     ```bash
     npm run dev
     ```

---

## How to Run Tests

### Run All Tests
```bash
  npm run test:all
```

### Run Tests in Headed Mode
```bash
  npm run test:headful
```

### Run a Single Test
```bash
  npm run test:single
```

### View Test Reports
```bash
  npm run test:report
```

---

## Design Choices

### Centralized Selectors
Selectors for UI elements are stored in `selectors/poll-page.js`, making it easier to update locators without modifying test files.

### Utility Functions
Reusable functions for UI interactions (e.g., `createGroupPoll`) are in `helpers/polls-ui.js`, ensuring cleaner test code.

### API-Based Participant Actions
API commands, such as adding votes for participants, are implemented in `setup/commands/add-participants.js`. This approach reduces reliance on UI-based testing for repetitive actions.

### Faker for Dynamic Data
We use [Faker.js](https://fakerjs.dev/) to generate realistic test data (e.g., poll titles, participant names) to improve test reliability and reduce hardcoding.

### CI/CD Integration
While not yet implemented, the test suite is structured to easily integrate into GitHub Actions or any CI/CD pipeline.

---

## Future Improvements

### 1. GitHub Workflow for CI/CD Integration
- Add a `.github/workflows` folder to enable automated test execution on pull requests.
- Example YAML workflow:
  ```yaml
  name: Playwright Tests
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with:
            node-version: 16
        - run: npm install
        - run: npm run test:all
  ```

### 2. Environment-Specific Configuration
- Use environment variables to support different environments (e.g., `localhost`, staging, production).
- Example in `playwright.config.js`:
  ```javascript
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';
  ```

### 3. Additional API Test Cases
- Expand `setup/endpoints` with more test cases for:
  - Poll deletion.
  - Retrieving participant lists.
  - Edge cases for invalid API requests.

### 4. Enhanced Reporting
- Integrate [Allure Playwright Reporter](https://github.com/allure-framework/allure-js) for better reporting with screenshots and logs.

### 5. Broader Browser Coverage
- Add cross-browser tests for Chromium, Firefox, and WebKit in the Playwright config.

### 6. Improved Dynamic Tests
- Make tests more dynamic by parameterizing data and running with different inputs (e.g., varying participant counts).

---

## Contact

For any questions or issues, feel free to reach out at rodneyovbiye@gmail.com.
