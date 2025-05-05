import { QueryStoreItem } from '@graphiql/toolkit';
import {ReactNode, useEffect, useState} from 'react';
import {createContextHook, createNullableContext} from '@graphiql/react';

export type SnippetContextType = {
  items: QueryStoreItem[];
  editQuery: (query: string) => void;
  editVariables: (variables: string) => void
  snippetsEndpoint: string;
};

export const SnippetContext = createNullableContext<SnippetContextType>('SnippetContext');

type SnippetContextProviderProps = {
  children: ReactNode;
  snippetsEndpoint: string;
  editQuery: (query: string) => void
  editVariables: (variables: string) => void
};

export type Snippet = {
  title: string;
  query: string;
  variables?: string;
};

export function SnippetContextProvider({ editQuery, editVariables, snippetsEndpoint, children }: SnippetContextProviderProps) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    fetch(snippetsEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Cannot download snippets.');
        }
        return response.json();
      })
      .then((data) => setSnippets(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const items: QueryStoreItem[] = [];
  for (let snippet of snippets) {
    items.push({
      operationName: snippet.title,
      query: snippet.query,
      variables: snippet.variables,
    })
  }

  const value: SnippetContextType = {
    items,
    editQuery,
    editVariables,
    snippetsEndpoint
  };

  return (
    <SnippetContext.Provider value={value}>{children}</SnippetContext.Provider>
  );
}

export const useSnippetContext =
  createContextHook<SnippetContextType>(SnippetContext);
