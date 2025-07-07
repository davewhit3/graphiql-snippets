import { GraphiQLPlugin } from '@graphiql/react';
import './style.css';
import {SnippetContextProvider, SnippetShareContextProvider} from './context';
import { Snippet, SnippetShare } from './components';
import Icon from './icon.svg';
import {useEffect} from 'react';


export {
  SnippetContext,
  SnippetShareContext,
  SnippetContextProvider,
  SnippetShareContextProvider,
  useSnippetContext,
  useSnippetShareContext,
  type SnippetContextType,
  type SnippetShareContextType,
} from './context';

export default function snippetPlugin(
  snippetsEndpoint: string,
  setQuery: (query: string) => void,
  setVariables: (variables: string) => void
): GraphiQLPlugin {
  return {
    title: 'Snippet',
    icon: () => <Icon />,
    content: () => {
      return (
        <SnippetContextProvider
          editQuery={setQuery}
          editVariables={setVariables}
          snippetsEndpoint={snippetsEndpoint}>
          <Snippet />
        </SnippetContextProvider>
      )
    }
  }
};

export function snippetSharePlugin(
  setQuery: (query: string) => void,
  setVariables: (variables: string) => void
) {
  let compressedQuery = undefined;

  const url = new URL(window.location.href);
  const query  = url.searchParams.get('q');

  if (query !== null) {
    compressedQuery = query;
  }

  return (
      <SnippetShareContextProvider
        compressedQuery={compressedQuery}
        editQuery={setQuery}
        editVariables={setVariables}
      >
        <SnippetShare />
      </SnippetShareContextProvider>
    )
};

