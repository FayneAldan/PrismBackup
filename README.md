I have decided to discontinue this project in favor of [resticprofile].
[Here is my profile.][config] Feel free to modify it to your needs.

[resticprofile]: https://creativeprojects.github.io/resticprofile/
[config]: https://gist.github.com/RuiNtD/7c006eb03928776695bf5e49c98b673c

---

# Prism Launcher Backup

This script makes it easy to automatically backup your [Prism Launcher] (or [MultiMC]) data using [Restic].
You can also run the program by itself to do a manual backup, which will also include vanilla launcher data.

**This script is designed for Windows.**\
MacOS and Linux users will have to manually specify game directories in `.env`

## Requirements

- [Deno]
- [Restic]
- [PowerShell]

## Installation

- Create a [Restic] repository wherever you desire
- Open Prism Launcher, click Folders at the top, then View Launcher Root Folder
- Create a `.env` file in this folder, using [.env.example] as a template
- Download [backup.ps1] and [doRestic.ps1] to this folder
- Go back to Prism Launcher and go to Settings
- Go to the Custom Commands tab
- Next to "Pre-launch command", type in: `pwsh ../../../backup.ps1 --tag launch`
- Next to "Post-exit command", type in: `pwsh ../../../backup.ps1 --tag exit`

## Usage

When you close an instance, that instance should be automatically backed up.

Because of the nature of Restic, unchanged files between each snapshot will only be stored once,
saving disk space over the course of several backups.

You can also manually run `backup.ps1` to backup all your Prism Launcher and vanilla launcher data
or use `./doRestic.ps1` in your terminal to access `restic` with `.env` in environment.

[prism launcher]: https://prismlauncher.org/
[multimc]: https://multimc.org/
[restic]: https://restic.net/
[deno]: https://deno.land/
[.env.example]: ./.env.example
[excludes.ts]: ./src/excludes.ts
[powershell]: https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell
[backup.ps1]: ./pwshscripts/backup.ps1
[doRestic.ps1]: ./pwshscripts/doRestic.ps1
