export interface IPreferences {
}

export interface IGenerateOptions {
    prefs: IPreferences;
}

export default async function generate(_opt: IGenerateOptions): Promise<{
    success: boolean;
    error: string | undefined;
    code: string | undefined;
}> {
    // todo: only for demo purposes
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                error: undefined,
                code: '<span style="color: red;">Test</span>',
            });
        }, 1000);
    });
}
