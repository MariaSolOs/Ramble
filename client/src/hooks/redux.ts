import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { RootState, AppDispatch } from 'store/store';

// Typed hooks for getting autocompletion when accessing the store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();