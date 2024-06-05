// useModalStore.js

import { create } from 'zustand';

export const useModalStore = create((set) => ({
    isModalOpen: false,
    modalType: null,
    modalData: null, // Add a field to keep track of the current modal data
    openModal: (type, data) => set({ isModalOpen: true, modalType: type, modalData: data }),
    closeModal: () => set({ isModalOpen: false, modalType: null, modalData: null }),
}));
