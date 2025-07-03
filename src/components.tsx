import { useSnippetContext } from './context';
import { UnStyledButton } from '@graphiql/react';
import { QueryStoreItem } from '@graphiql/toolkit';

export function Snippet() {
  const context = useSnippetContext();

  return (
    <section aria-label="Snippet" className="graphiql-history">
      <div className="graphiql-history-header">
        Snippet
      </div>
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
      {(
        <>
          <button
            className="graphiql-un-styled graphiql-history-item-label"
            aria-label="Set active"
          >
            {props.item.operationName}
          </button>
        </>
      )}
    </li>
  );
}

type QuerySnippetItemProps = {
  item: QueryStoreItem;
};
