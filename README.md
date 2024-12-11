# Boost Playground

A simple project to demonstrate how to deploy a Boost using the Boost SDK.

## Prerequisites

- Node.js v18+
- pnpm

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.sample .env
   ```

4. Configure your environment variables in `.env`:
   - `ACCOUNT_1_KEY`: Your private key (must be the owner of the budget)
   - `BUDGET_ADDRESS`: The address of your ManagedBudget contract

## Important Notes

- The budget account (`BUDGET_ADDRESS`) must be authorized to the EOA associated with your private key
- The budget must be funded with the staging token on Sepolia: `0xf3B2d0E4f2d8F453DBCc278b10e88b20d7f19f8D`
- This example runs on Sepolia testnet

## Running the Project

Start the development server:
```bash
pnpm dev
```

This will run the script and deploy the Boost.
