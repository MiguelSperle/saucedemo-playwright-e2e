# Sauce Demo – E2E Tests

End-to-end (E2E) test project for the [Sauce Demo](https://www.saucedemo.com) website, written with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** pattern.

> 📌 **Status:** work in progress.

---

## 📑 Table of contents

1. [Overview](#-overview)
2. [Tech stack](#-tech-stack)
3. [Prerequisites and installation](#-prerequisites-and-installation)
4. [Project structure](#-project-structure)
5. [Core concepts](#-core-concepts)
6. [Conventions](#-conventions)

---

## 🎯 Overview

The goal of this project is to validate the main Sauce Demo flows through the UI, in the same way a real user would.

---

## 🛠 Tech stack

| Technology | Purpose |
| --- | --- |
| [Playwright](https://playwright.dev) | Execution and assertions of E2E tests |
| [TypeScript](https://www.typescriptlang.org) | Typing and code organization |
| [Node.js](https://nodejs.org) / [npm](https://www.npmjs.com) | Management and execution of dependencies |

---

## ✅ Prerequisites and installation

**Prerequisites:** [Node.js](https://nodejs.org) (LTS version recommended) and npm.

```bash
# 1. Clone the repository
git clone <repository-url>
cd saucedemo-playwright-e2e

# 2. Install dependencies
npm install

# 3. Install the Playwright browsers
npx playwright install
```

---

## ▶️ Running the tests

```bash
# Run all tests
npx playwright test

# Run a specific file
npx playwright test tests/shopping-cart.spec.ts

# Run tests by title
npx playwright test -g "sorts products by name"

# Run with the Playwright UI mode
npx playwright test --ui

# Run with the browser visible
npx playwright test --headed

# Open the report from the last run
npx playwright show-report
```

---

## 🗂 Project structure

```text
.
├── .github/
│   └── workflows/
│       └── ci.yml      # GitHub Actions workflow (CI)
├── components/                 # Reusable UI components (shared across pages)
│   └── header-component.ts
├── constants
│   └── index.ts
├── data/                       # Test data
│   ├── products.ts
│   └── users.ts
├── fixtures/                   # Custom Playwright fixtures
│   └── index.ts
├── pages/                      # Page Objects (one per page)
│   ├── manager/
│   │   └── page-manager.ts      # Centralizes access to all Page Objects
│   ├── authentication-page.ts
│   ├── checkout-complete-page.ts
│   ├── checkout-information-page.ts
│   ├── checkout-overview-page.ts
│   ├── inventory-page.ts
│   ├── product-details-page.ts
│   └── shopping-cart-page.ts
├── tests/                      # Test specs
│   ├── setup/
│   │   └── auth.setup.ts       # Authenticate once and saves the session
│   ├── authentication.spec.ts
│   ├── checkout.spec.ts
│   ├── product-filter.spec.ts
│   └── shopping-cart.spec.ts
├── .gitignore                  # Files and folders ignored by Git
├── package-lock.json
├── package.json
├── playwright.config.ts        # Playwright configuration
├── README.md
└── tsconfig.json               # TypeScript configuration
```

---

## 🧩 Core concepts

### Page Object Model (POM)

Each page of the site has a class in `pages/` that holds:

- the **locators** (how to find the elements);
- the **actions** (how to interact with the page).

Tests do **not** use selectors directly: they call Page Object methods. This way, when the UI changes, the fix is made in a single place.

### Components

Elements that appear on several pages (such as the header with the cart icon) live in `components/` and are used by the Page Objects (for example, `HeaderComponent` inside `InventoryPage`).

### Page Manager

The `PageManager` class (`pages/manager/PageManager.ts`) creates and exposes all Page Objects in one place. In the tests, it is provided by the `pm` fixture, so you don't need to instantiate each page manually.

### Fixtures

The fixtures in `fixtures/index.ts` extend Playwright's `test` with ready-to-use resources for the specs, such as:

- `pm`: the Page Manager;
- `shoppingCartWithProduct`: a cart that already has one product;
- `shoppingCartWithMultipleProducts`: a cart that already has several products.

In the specs, import `test` and `expect` from the fixtures instead of directly from `@playwright/test`.

### Test data

The files in `data/` hold the data used by the tests (products and users), avoiding repeated values across the specs.

### Reused authentication

The `tests/setup/auth.setup.ts` file performs authentication once and saves the session to `playwright/.auth/user.json`. The remaining tests reuse that session and start already authenticated, which makes the run faster. The `user.json` file is auto-generated and should not be edited manually.

---

## 📐 Conventions

- **Specs:** named with a noun, inside `tests/` (e.g. `authentication.spec.ts`).
- **Page Objects:** named after the page, ending in `-page`, inside `pages/` (e.g. `inventory-page.ts`).
- **Components:** named after the component, ending in `-component`, inside `components/` (e.g. `header-component.ts`).
- **Test titles:** describe the expected behavior, in English (e.g. `should authenticate successfully`).
- **Grouping:** use `test.describe` to group scenarios by context or by where the action starts.
- **Assertions:** live in the specs, never in the Page Objects.

---

