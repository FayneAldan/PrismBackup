# Prism Launcher Backup

This script makes it easy to automatically backup your [Prism Launcher] (or [MultiMC]) data using [Restic].
You can also run the program by itself to do a manual backup, which will also include vanilla launcher data.

**This script is untested on Mac and Linux.**\
You may have to manually specify game directories in `.env`

## Requirements

- [Deno]
- [Restic]

## Installation

- Create a [Restic] repository wherever you desire
- Open a terminal into your Prism Launcher data folder (typically `%AppData%\PrismLauncher`)
- ```
  deno compile -A src/backup.ts
  deno compile -A src/doRestic.ts
  ```
  This will create `backup.exe` and `doRestic.exe`
- Create a `.env` file next to `backup.exe`, using [.env.example] as a template
- Open Prism Launcher and go to Settings
- Go to the Custom Commands tab
- Next to "Post-exit command", type in: `backup`

## Usage

If you followed the steps under Installation, when you close an instance, that instance will be backed up.
You can also manually run `backup.exe` to backup all your Prism Launcher and vanilla launcher data
and you can use `doRestic.exe` in your terminal to access `restic` with `.env` in environment.

Because of the nature of Restic, unchanged files between each snapshot will only be stored once,
saving disk space over the course of several backups.

Also, the backup program creates and uses an "exclude file" to save space.
Namely, folders that can be easily redownloaded by Minecraft will be excluded, including `assets` and `libraries`.
However, do note that **world backups, logs, and screenshots _will not_ be backed up** to save disk space.
Please see [excludes.ts] for more details.

## PolyMC?

No. Use [Prism Launcher] instead:\
https://prismlauncher.org/wiki/overview/faq/#what-happened-to-polymc-why-is-there-a-new-fork

[prism launcher]: https://prismlauncher.org/
[multimc]: https://multimc.org/
[restic]: https://restic.net/
[deno]: https://deno.land/
[.env.example]: ./.env.example
[excludes.ts]: ./src/excludes.ts
