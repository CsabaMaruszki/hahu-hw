## Prerequisites for local execution
- Set `.env` variables based on `.env.example` or set the required environmental params however you like.
- Install dependencies with `pnpm i` and install Playwright browsers with command `pnpm exec playwright install`.

## Execution
To run on multiple browsers set `CROSS_BROWSER` env variable `true`.

Command for tests: `pnpm test`