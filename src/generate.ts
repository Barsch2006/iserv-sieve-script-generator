export interface IGenerateOptions {}

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
                code: 'console.log("Hello, World!")',
            });
        }, 1000);
    });
}
