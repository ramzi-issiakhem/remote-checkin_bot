# Remote HR Discord Bot

A simple and open-source Discord bot designed to streamline remote HR operations. The bot currently supports employee registration, check-in and check-out functionalities, and generating work hour reports.

## Features

1. **Employee Registration**  
   Employees can register themselves in the system to start tracking their work hours.

2. **Check-in/Check-out System**  
   Employees can check in and check out to log their work hours.

3. **Work Report**  
   Generate reports that show how many hours each employee worked within a specific period.

---
## Commands
Here are the list of the available commands to execute on the server, they are for now, divide in two categories, the public accessible and the private one executable only if you have the Specific Role created by the bot (Remote HR).
1. Private Commands:
    - /add-company: Create a company with a specific name and description
    - /report: Give you a simple report on the working hours by specifying the number of previous days and the company name if needed

1. Public Commands:
    - /remote-register: Register the user as an employee of a specific company with all his informations.
    - /check-in: Check-in the user, you can add the time in case you forgot to check-in before.
    - /check-out: Check-out the user, you can add the time in case you forgot to check-out before.
    - /temp-check-out: Temporarily Check-out the user. 



## Installation
To directly use the Discord bot, you can add our [**Official Bot**](https://discord.com) directly to your server and therefore, being ready to use it on the track.
If you prefer a more custom solution you can self-hosted on your machine.

### Prerequisites

- A [Discord](https://discord.com/) account.
- [Node.js](https://nodejs.org/) (version 18 or newer is required.).
- [npm](https://www.npmjs.com/) (comes with Node.js).
- A GitHub account (optional, for forking or cloning the repository).

### Steps to Install and Launch the Bot

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/remote-hr-discord-bot.git
   cd remote-hr-discord-bot
2. **Install the dependencies**  
   ```bash
   npm install
3. **Create a Discord Bot**  
    - Go to the [Discord Developer Portal](https://discord.com/developers/applications)
    - Click on **New Application** and name your bot 
    - Navigate to the **Bot** section and click Add Bot
    - Copy the bot token.

4. **Setup Environnement Variables**  
You will find a file named .env.example with the environnement variables needed to run the Bot.
    - DEBUG: Display differents logs and database logging
    - DISCORD_TOKEN: The discord bot token that you find at (Discord Developper Portal > Bot > Reset Token )
    - DISCORD_CLIENT_ID: The bot's client ID that you find at (Discord Developer Portal > OAuth2 > ClientID )
    - GUILD_ID: The Discord's server ID that you use as a dev server
    - PURGE_AFTER_BOOT: whether the database should be completly resync and therefore purge all the data
    - AUTHORIZED_ROLE_NAMES:  The role names authorized to execute administrative commands
    - CREATED_ROLE_NAME: The name for the role created automatically by your bot on any server joined.

5. **Add the Bot to your server**  
    - Go to the OAuth2 > URL Generator section in the Discord Developer Portal.
    - Select the bot scope and assign necessary permissions.
    - Copy the generated URL, paste it into your browser, and invite the bot to your server.

6. **Launch your bot**
    ```bash
    npm run start
    npm run build && npm run start
    
## Contributing
- Fork the repository.
- Create a new branch: git checkout -b feature-branch-name.
- Commit your changes: git commit -m 'Add some feature'.
- Push to the branch: git push origin feature-branch-name.
- Open a pull request.

## License
This project is licensed under the [*MIT License*](https://opensource.org/license/MIT).


