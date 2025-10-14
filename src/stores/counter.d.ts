import type { Poem } from '../types/poem.d.ts';
export declare const useCounterStore: import("pinia").StoreDefinition<"counter", Pick<{
    count: import("vue").Ref<number, number>;
    doubleCount: import("vue").ComputedRef<number>;
    increment: () => void;
}, "count">, Pick<{
    count: import("vue").Ref<number, number>;
    doubleCount: import("vue").ComputedRef<number>;
    increment: () => void;
}, "doubleCount">, Pick<{
    count: import("vue").Ref<number, number>;
    doubleCount: import("vue").ComputedRef<number>;
    increment: () => void;
}, "increment">>;
export declare const usePoemStore: import("pinia").StoreDefinition<"poem", Pick<{
    poems: import("vue").Ref<{
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[], Poem[] | {
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[]>;
    favoritePoems: import("vue").Ref<{
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[], Poem[] | {
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[]>;
    getPoems: () => void;
    addToFavorites: (poem: Poem) => void;
    removeFromFavorites: (poemId: number) => void;
}, "poems" | "favoritePoems">, Pick<{
    poems: import("vue").Ref<{
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[], Poem[] | {
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[]>;
    favoritePoems: import("vue").Ref<{
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[], Poem[] | {
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[]>;
    getPoems: () => void;
    addToFavorites: (poem: Poem) => void;
    removeFromFavorites: (poemId: number) => void;
}, never>, Pick<{
    poems: import("vue").Ref<{
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[], Poem[] | {
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[]>;
    favoritePoems: import("vue").Ref<{
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[], Poem[] | {
        id: number;
        title: string;
        author: string;
        dynasty: string;
        content: string;
    }[]>;
    getPoems: () => void;
    addToFavorites: (poem: Poem) => void;
    removeFromFavorites: (poemId: number) => void;
}, "addToFavorites" | "getPoems" | "removeFromFavorites">>;
