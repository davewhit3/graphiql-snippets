import { GraphiQLPlugin } from '@graphiql/react';
import './style.css';
import { SnippetContextProvider } from './context';
import { Snippet } from './components';
import Icon from './icon.svg';

export { Snippet };

export {
  SnippetContext,
  SnippetContextProvider,
  useSnippetContext,
  type SnippetContextType,
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