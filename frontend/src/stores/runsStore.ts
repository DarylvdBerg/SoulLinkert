import { create } from 'zustand';

interface RunState {
    runs: RunData[];
    getRun: (identifier: string) => RunData;
    createRun: (run: RunData) => void;
}

export type RunData = {
    id: string;
    generation: string;
    region: string;
    gameName: string;
    playerOne?: string;
    playerTwo?: string;
    isPlayable: boolean;
};

export const useRunStore = create<RunState>()((set, get) => ({
    runs: [],
    getRun: (identifier: string): RunData => {
        const run = get().runs.find((run) => run.id === identifier);
        if (!run) {
            throw new Error(`Run with identifier "${identifier}" not found`);
        }
        return run;
    },
    createRun: (run: RunData) => set((state) => ({ runs: [...state.runs, run] })),
}));
