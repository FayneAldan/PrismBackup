# Prism Launcher Backup

This script makes it easy to automatically backup your [Prism Launcher] (or [MultiMC]) data using [Restic].
You can also run the program by itself to do a manual backup, which will also include vanilla launcher data.

**This script is designed for Windows.**\
MacOS and Linux users will have to manually specify game directories in `.env`

## Requirements

- [Deno]
- [Restic]

## Easy Installation

- Create a [Restic] repository wherever you desire
- Open Prism Launcher, click Folders at the top, then View Launcher Root Folder
- Create a `.env` file in this folder, using [.env.example] as a template
- Go back to Prism Launcher and go to Settings
- Go to the Custom Commands tab
- Next to "Post-exit command", type in: `deno run -Ar https://RuiNtD.github.io/PrismBackup/src/backup.ts`

## Advanced Installation

- Create a [Restic] repository wherever you desire
- Open Prism Launcher, click Folders at the top, then View Launcher Root Folder
- Open a terminal in this folder
- ```
  deno compile -Ar https://RuiNtD.github.io/PrismBackup/src/backup.ts
  deno compile -Ar https://RuiNtD.github.io/PrismBackup/src/doRestic.ts
  ```
  This will create `backup.exe` and `doRestic.exe`
- Create a `.env` file next to `backup.exe`, using [.env.example] as a template
- Go back to Prism Launcher and go to Settings
- Go to the Custom Commands tab
- Next to "Post-exit command", type in: `backup`

## Usage

When you close an instance, that instance should be automatically backed up.

Because of the nature of Restic, unchanged files between each snapshot will only be stored once,
saving disk space over the course of several backups.

If you followed the **Advanced** Installation instructions,
you can also manually run `backup.exe` to backup all your Prism Launcher and vanilla launcher data
or use `doRestic.exe` in your terminal to access `restic` with `.env` in environment.

## PolyMC?

No. Use [Prism Launcher] instead:\
<https://prismlauncher.org/wiki/overview/faq/#what-happened-to-polymc-why-is-there-a-new-fork>

[prism launcher]: https://prismlauncher.org/
[multimc]: https://multimc.org/
[restic]: https://restic.net/
[deno]: https://deno.land/
[.env.example]: ./.env.example
[excludes.ts]: ./src/excludes.ts
