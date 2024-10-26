'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect
} from 'react';

type ActiveProjectState = {
    activeProject: boolean;
};

type Action = { type: 'SET_ACTIVE_PROJECT'; payload: boolean };

const ActiveProjectContext = createContext<ActiveProjectState | undefined>(undefined);
const ActiveProjectDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

const loadInitialState = (): ActiveProjectState => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedValue = localStorage.getItem('activeProject');
    return {
      activeProject: storedValue ? JSON.parse(storedValue) : false
    };
  }
  return {
    activeProject: false
  };
};

const activeProjectReducer = (state: ActiveProjectState, action: Action): ActiveProjectState => {
  switch (action.type) {
    case 'SET_ACTIVE_PROJECT':
      return { ...state, activeProject: action.payload };
    default:
      return state;
  }
};

export const ActiveProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(activeProjectReducer, loadInitialState());

  useEffect(() => {
    localStorage.setItem('activeProject', JSON.stringify(state.activeProject));
  }, [state.activeProject]);

  return (
        <ActiveProjectContext.Provider value={state}>
            <ActiveProjectDispatchContext.Provider value={dispatch}>
                {children}
            </ActiveProjectDispatchContext.Provider>
        </ActiveProjectContext.Provider>
  );
};

export const useActiveProject = () => {
  const context = useContext(ActiveProjectContext);
  if (context === undefined) {
    throw new Error('useActiveProject must be used within an ActiveProjectProvider');
  }
  return context;
};

export const useActiveProjectDispatch = () => {
  const context = useContext(ActiveProjectDispatchContext);
  if (context === undefined) {
    throw new Error('useActiveProjectDispatch must be used within an ActiveProjectProvider');
  }
  return context;
};
