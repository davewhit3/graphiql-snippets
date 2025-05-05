# 🧩 GraphiQL Snippets Plugin

A lightweight plugin for [GraphiQL](https://github.com/graphql/graphiql) that adds support for predefined GraphQL query snippets. Perfect for documentation, onboarding, and speeding up development workflows.

## ✨ Features

- 📋 Easily accessible list of reusable GraphQL queries
- 📥 Load snippets from a static `snippets.json` file or fetch from an API
- 🧠 Deep integration with the GraphiQL editor context
- ⚡ Insert queries into the editor with a single click

## 📦 Installation

```bash
pnpm add graphiql-snippets
```

## 🚀 Usage

Import the plugin and add it to your GraphiQL instance:
```typescript jsx
import  snippetPlugin from 'graphiql-snippets';

...

const [query, setQuery] = useState('');
const [variables, setVariables] = useState('');
const plugin = snippetPlugin(snippetsUrl, setQuery, setVariables);

return (
  <div style={{ height: '100vh', padding: 0 }}>
    <GraphiQL
      disableTabs={true}
      fetcher={fetcher}
      query={query}
      variables={variables}
      plugins={[plugin]}
    />
  </div>
);
```

Snippets example:
```json
[
  {
    "title": "All Users",
    "query": "{ users { id name email } }"
  },
  {
    "title": "User by ID",
    "query": "query($id: ID!) { user(id: $id) { id name } }"
  }
]

```

## 🛠 Customization
You can fork or extend this plugin to support:

 - Grouped or categorized snippets

 - Import from authenticated APIs

 - Favorite or frequently used queries


## 🧪 Development

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173 to test the plugin in the GraphiQL playground.
