import pako from 'pako';

import {useSnippetContext, useSnippetShareContext} from './context';
import {QueryStoreItem} from '@graphiql/toolkit';
import {useEffect} from 'react';

export function Snippet() {
  const context = useSnippetContext();

  return (
    <section aria-label="Snippet" className="graphiql-history">
      <div className="graphiql-history-header">Snippet</div>
      <ul className="graphiql-history-items">
        {context?.items.map((item, index) => (
          <SnippetItem item={item} key={`snippet-item-${index}`} />
        ))}
      </ul>
    </section>
  );
}

function SnippetItem(props: QuerySnippetItemProps) {
  const context = useSnippetContext();

  return (
    <li
      onClick={() => {
        context?.editQuery(props.item.query ?? '');

        if (context?.editVariables) {
          context.editVariables(props.item.variables ?? '');
        }
      }}
      className={'graphiql-history-item'}>
      {
        <>
          <button
            className="graphiql-un-styled graphiql-history-item-label"
            aria-label="Set active">
            {props.item.operationName}
          </button>
        </>
      }
    </li>
  );
}

type QuerySnippetItemProps = {
  item: QueryStoreItem;
};

export function SnippetShare() {
  const context = useSnippetShareContext();

  useEffect(() => {
    if (context.compressedQuery !== undefined) {
      const data = decompressQuery(context.compressedQuery);
      try {
        const q = JSON.parse(data) as QueryStoreItem;

        if (q.query) {
          context.editQuery(q.query);
        }

        if (q.variables) {
          context.editVariables(q.variables);
        }
      } catch {
        // ignore
      }
    }
  }, [context.editQuery, context.editVariables]);

  const handleClick = () => {
    const query = localStorage.getItem("graphiql:query");
    const variables = localStorage.getItem("graphiql:variables");

    const data = JSON.stringify({
      "query": query,
      "variables": variables
    })

    const compressed = compressQuery(data ?? '');
    const url = new URL(window.location.href);
    url.searchParams.set('q', compressed);
    navigator.clipboard.writeText(url.toString());

    alert('Link do zapytania został skopiowany!');
  }

  return  (
    <button
      onClick={handleClick}
      type="button"
      className="graphiql-un-styled graphiql-toolbar-button"
      aria-label="Share query">
      <SnippetShareIcon />
    </button>
  )
}

function compressQuery(query: string): string {
  const compressed = pako.gzip(query);
  return btoa(String.fromCharCode(...compressed));
}

function decompressQuery(base64: string): string {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return pako.ungzip(bytes, {to: 'string'});
}

const SnippetShareIcon = function () {
  return (
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="graphiql-toolbar-icon"
        aria-hidden="true">
        <title>share icon</title>
        <path
          d="M6 12V19.5C6 20.3284 6.67157 21 7.5 21H17.5C18.3284 21 19 20.3284 19 19.5V12"
          stroke="currentColor"
          strokeWidth="1.5625"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 16V4"
          stroke="currentColor"
          strokeWidth="1.5625"
          strokeLinecap="round"
        />
        <path
          d="M9 7L12.5 4L16 7"
          stroke="currentColor"
          strokeWidth="1.5625"
          strokeLinejoin="round"
        />
      </svg>
  );
};