import { writable } from 'svelte/store';

export const userData = writable({
    nickname: '',
    id: null,
    isConnected: false
});