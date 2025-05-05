export default function commentFactory(commentsEnabled, comments) {
  return function (id) {
    return commentsEnabled ? '// ' + comments[id] : '';
  };
}