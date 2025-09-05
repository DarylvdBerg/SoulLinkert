import { create } from 'zustand';

interface RunState {
    runs: Run[];
    getRun: (identifier: string) => Run;
    createRun: (run: Run) => void;
}

export type Run = {
    identifier: string;
    generation: string;
    region: string;
    gameName: string;
    playerOne?: string;
    playerTwo?: string;
    isPlayable: boolean;
};

export const useRunStore = create<RunState>()((set, get) => ({
    runs: [],
    getRun: (identifier: string): Run => {
        const run = get().runs.find((run) => run.identifier === identifier);
        if (!run) {
            throw new Error(`Run with identifier "${identifier}" not found`);
        }
        return run;
    },
    createRun: (run: Run) => set((state) => ({ runs: [...state.runs, run] })),
}));
