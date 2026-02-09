# JellyCove Bumping Discord Bot

## Overview
A Discord bot for tracking server bumps on JellyCove. Built with Node.js and discord.js v14, using MariaDB for data persistence.

## Project Architecture
- **Language**: Node.js 20
- **Framework**: discord.js v14
- **Database**: MariaDB (external)
- **Entry Point**: `src/index.js`

### Directory Structure
```
src/
  index.js          - Bot entry point, loads commands and events
  db.js             - MariaDB connection pool
  add-commands.js   - Script to register slash commands
  commands/         - Slash command handlers
    addbump.js
    bumpleaderboard.js
    bumps.js
    removebump.js
    setbumps.js
  data/
    bumps.js        - Bump data operations
  events/
    interactionCreate.js  - Slash command interaction handler
    messageCreate.js      - Message event handler
```

## Required Environment Variables
- `DISCORD_TOKEN` - Discord bot token
- `DISCORD_CLIENT_ID` - Discord application client ID (for registering slash commands)
- `DB_HOST` - MariaDB host
- `DB_PORT` - MariaDB port
- `DB_USER` - MariaDB username
- `DB_PASSWORD` - MariaDB password
- `DB_NAME` - MariaDB database name

## Running
- Workflow "Discord Bot" runs `node src/index.js`
- To register slash commands: `node src/add-commands.js`
