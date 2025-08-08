import { PairData } from '@/types/pair'
import { create } from 'zustand'

interface PairState { 
    pairs: PairData[]
    addPair: (newPair: PairData) => void
    updatePair: (index: number, updatedPair: PairData) => void
}

export const usePairStore = create<PairState>()((set) => ({
    pairs: [],
    addPair: (newPair: PairData) => set((state) => ({ pairs: [...state.pairs, newPair] })),
    updatePair: (index: number, updatedPair: PairData) => set((state) => ({
        pairs: state.pairs.map((pair, i) => i === index ? updatedPair : pair)
    })),
}))