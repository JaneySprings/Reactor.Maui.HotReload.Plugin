import { ChildProcess, exec } from "child_process";
import { extensions } from "vscode";
import * as path from "path";


const extensionId = 'nromanov.reactormaui-hotreload';
export class HotReloadController {
    private static process: ChildProcess | undefined;

    public static startHotReload(project: string, framework: string) {
        if (this.process && !this.process.killed)
            this.process.kill();

        const extensionPath = extensions.getExtension(extensionId)?.extensionPath ?? '';
        const assemblyPath: string = path.join(extensionPath, "extension", "bin", "MauiReactor.HotReloadConsole.dll"); 
        
        const cwd = path.dirname(project);
        HotReloadController.process = exec(`dotnet ${assemblyPath} -f ${framework}`, { cwd: cwd });
    }

    public static stopHotReload() {
        if (this.process && !this.process.killed)
            this.process.kill();
    }
}