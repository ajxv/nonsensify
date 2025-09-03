# Nonsensify VS Code Extension – Developer Quickstart

Welcome to the codebase for the Nonsensify VS Code extension! This document will help you get oriented and productive as quickly as possible.

## Project Structure

- **`package.json`**  
  Declares the extension, its commands, and configuration. If you want to add new commands or change metadata, start here.

- **`src/extension.ts`**  
  The main entry point. This is where the extension registers its commands and implements their logic. If you want to change what happens when a user runs a command, this is the file to edit.

- **`test/`**  
  Contains automated tests for the extension. If you add new features, please add or update tests here.

## Running and Debugging

- Press `F5` to launch a new VS Code window with your extension loaded.
- Use the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and type the name of your command (e.g., "Nonsensify: ...") to run it.
- Set breakpoints in `src/extension.ts` to debug.
- Extension output appears in the Debug Console.

## Making Changes

- Edit `src/extension.ts` to change command behavior.
- Update `package.json` to register new commands or change extension metadata.
- After making changes, reload the extension window (`Ctrl+R` or `Cmd+R` on Mac) or relaunch with `F5`.

## Testing

- Tests live in the `test/` folder and use the standard VS Code extension test runner.
- Run the "watch" task via **Tasks: Run Task** to enable test discovery.
- Use the Testing view or hotkeys to run tests and see results.
- Add new tests for any new features or bug fixes.

## Contributing

- Follow [VS Code UX guidelines](https://code.visualstudio.com/api/ux-guidelines/overview) for a seamless user experience.
- Keep the extension lean—bundle dependencies if possible.
- If you want to publish, see [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## Need Help?

- For API details, check `node_modules/@types/vscode/index.d.ts`.
- For issues or feature requests, use the project's issue tracker.
