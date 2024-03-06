type SieveActionType = 'move_in_folder' | 'forward';

type SieveAction = {
    type: SieveActionType;
    folder?: `INBOX/${string}`;
    condition: string;
    create_folder?: string;
    forward_mails?: `${string}@${string}.${string}`[];
};

type GenerateSieveCodeOptions = {
    comments?: boolean;
    version: `${number}.${number}.${number}`;
    actions: SieveAction[];
};

export { type GenerateSieveCodeOptions, type SieveAction, type SieveActionType };
