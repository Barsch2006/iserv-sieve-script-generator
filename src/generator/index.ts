import { GenerateSieveCodeOptions } from "./types";

/**
 * Generates the sieve code for the given options
 * @returns the generated sieve code to be copied to the iserv settings
 */
function generateSieveCode(
    options: GenerateSieveCodeOptions,
    cb: (success: boolean, code?: string, error?: string) => void,
): void {
    let sieveCode = '';
    sieveCode += `# generated with https://barsch2006.github.io/iserv-sieve-script-generator (version ${options.version}) \n \n`;
    sieveCode += 'require ["fileinto","imapflags", "mailbox"];'
    options.actions.forEach((action) => {
        switch (action.type) {
            case 'move_in_folder':
                if (!action.folder) cb(false, undefined, 'folder is missing');
                break;
            case 'forward':
                if (!action.forward_mails) cb(false, undefined, 'forward_mails is missing');
                break;
        }
    });
    cb(true, sieveCode);
}

export { generateSieveCode };
