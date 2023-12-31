import { create } from "zustand";

type FavoritesStore = {
  favorites: string[];
  toggle: (favorite: string) => void;
};

type SearchStore = {
    search: string;
    setSearch: (search: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set) => {
  // Load favorites from local storage if available
  const storedFavorites = localStorage.getItem("favorites");
  const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  return {
    favorites: initialFavorites,
    toggle: (favorite) =>
      set((state) => {
        const updatedFavorites = state.favorites.includes(favorite)
          ? state.favorites.filter((f) => f !== favorite)
          : state.favorites.concat(favorite);

        // Update local storage whenever favorites change
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        return {
          favorites: updatedFavorites,
        };
      }),
  };
});

export const useSearchStore = create<SearchStore>((set) => ({
    search: "",
    setSearch: (search) => set({ search }),
}));