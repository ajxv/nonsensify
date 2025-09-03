// Import the VS Code extensibility API and utility functions
import * as vscode from 'vscode';
import {getVariables, generateNonsenseWord, replaceVariable, getRandomElement, isNonsenseWord} from './nonsensify'

// Called when the extension is activated (first command execution)
export function activate(context: vscode.ExtensionContext) {

	// Log activation (for debugging and fun)
	console.log('🎉 nonsensify extension activated: nonsense is now officially supported in your editor!');

	const disposable = vscode.commands.registerCommand('nonsensify.nonsensify', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage("Oops! No editor is open. Even nonsense needs a place to go!");
			return;
		}
		
		const document = editor.document;
		const documentText = document.getText();
		const maxTries = 20;

		// Extract variables from the document based on language
		const variables = getVariables(documentText, document.languageId);

		if (!variables || variables.length === 0) {
			// Warn if no variables are found
			vscode.window.showWarningMessage("No variables found! This code is already pure nonsense.");
			return;
		}

		// Attempt to pick a random variable that is not already a nonsense word
		let randomVariable: string | undefined;
		for (let i = 0; i < maxTries; i++) {
			const candidateVariable = getRandomElement(variables);
			if (!isNonsenseWord(candidateVariable)) {		
				randomVariable = candidateVariable;
				break;
			}
		}

		if (!randomVariable) {
			// Warn if variable selection fails
			vscode.window.showWarningMessage("Couldn't pick a variable. The nonsense gods are confused.");
			return;
		}
		
		// Generate a nonsense variable name that doesn't clash with existing variables or the one being replaced
		let randomNonsenseVariable: string | undefined;
		for (let i = 0; i < maxTries; i++) {
			const candidateNonsense = generateNonsenseWord();
			if (!variables.includes(candidateNonsense) && candidateNonsense !== randomVariable) {
				randomNonsenseVariable = candidateNonsense;
				break;
			}
		}

		if (!randomNonsenseVariable) {
			// Warn if nonsense generation fails
			vscode.window.showWarningMessage("Ran out of nonsense! Try again later.");
			return;
		}
		
		const edit = new vscode.WorkspaceEdit();
		
		// Replace all occurrences of the selected variable in the document
		const replaceRange = new vscode.Range(
			document.positionAt(0),
			document.positionAt(documentText.length)
		);

		const replacedDocumentText = replaceVariable(documentText, randomVariable, randomNonsenseVariable);

		edit.replace(document.uri, replaceRange, replacedDocumentText)
		await vscode.workspace.applyEdit(edit);

		// Inform the user of the chaos
		vscode.window.showInformationMessage('✨ Nonsensify has unleashed chaos upon your code! ✨');

		// Humorous info about the replacement
		vscode.window.showInformationMessage(
			`Heads up! The variable "${randomVariable}" has been heroically transformed into "${randomNonsenseVariable}". May your code be ever more mysterious! 🤪`
		);
	});

	// Ensure command is disposed when extension is deactivated
	context.subscriptions.push(disposable);
}

// Called when the extension is deactivated
export function deactivate() {}
