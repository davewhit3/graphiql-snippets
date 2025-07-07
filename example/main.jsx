import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import GraphiQL from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

import snippetPlugin, {snippetSharePlugin} from '../dist/index.esm.js';

const fetcherUrl = 'https://swapi-graphql.netlify.app/graphql';
const snippetsUrl = '/snippets.json';

const fetcher = createGraphiQLFetcher({
  url: fetcherUrl,
});

const App = () => {
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const plugin = snippetPlugin(snippetsUrl, setQuery, setVariables);
  const sharePlugin = snippetSharePlugin(setQuery, setVariables)

  return (
    <div style={{ height: '100vh', padding: 0 }}>
      <GraphiQL
        disableTabs={true}
        fetcher={fetcher}
        query={query}
        variables={variables}
        plugins={[plugin]}
        toolbar={{ additionalContent:  sharePlugin }}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

