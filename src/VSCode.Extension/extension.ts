import * as vscode from 'vscode';
import { HotReloadController } from './hotreloadcontroller';


const meteorDebugType = 'dotnet-meteor.debugger';
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.debug.onDidStartDebugSession((e) => {
		if (e.type !== meteorDebugType)
			return;
	
		const project = e.configuration.selected_project;
		const device = e.configuration.selected_device;
		const framework = project.frameworks?.find((it: any) => it.includes(device.platform))
		HotReloadController.startHotReload(project.path, framework);
	}));
	context.subscriptions.push(vscode.debug.onDidTerminateDebugSession((e) => {
		if (e.type !== meteorDebugType)
			return;

		HotReloadController.stopHotReload();
	}));
}

export function deactivate() {}
