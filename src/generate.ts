export interface IPreferences {
    base: 'grb';
    my_domain: `${string}.${string}`;
}

export interface IFilter {
}

export interface IGenerateOptions {
    prefs: IPreferences;
    filter: IFilter;
    buildOptions: {
        with_comments: boolean;
    };
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
                code: 'Code Generation Is Not Implemented Yet!' /* JSON.stringify(_opt) */,
            });
        }, 1000);
    });
}
