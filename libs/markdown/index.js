import marked from 'marked';

const renderer = new marked.Renderer();
renderer.table = (header, body) => {
  return `<table class="md-table"><thead>${header}</thead><tbody>${body}</tbody></table>`;
};
