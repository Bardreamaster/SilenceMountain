// On pages with `layout: cv`, a heading or line written as "Left | Right"
// becomes a row with the right part aligned right (place, dates).
// Use "\|" if you need a literal bar.

function splitNode(node) {
  const idx = node.children.findIndex((c) => c.type === 'text' && c.value.includes(' | '));
  if (idx === -1) return;
  const text = node.children[idx];
  const at = text.value.indexOf(' | ');
  const left = [
    ...node.children.slice(0, idx),
    { type: 'text', value: text.value.slice(0, at) },
  ];
  const right = [
    { type: 'text', value: text.value.slice(at + 3) },
    ...node.children.slice(idx + 1),
  ];
  node.children = [
    {
      type: 'element',
      tagName: 'span',
      properties: { className: ['cv-row'] },
      children: [
        { type: 'element', tagName: 'span', properties: {}, children: left },
        { type: 'element', tagName: 'span', properties: {}, children: right },
      ],
    },
  ];
}

function walk(node) {
  if (!node.children) return;
  for (const child of node.children) {
    if (child.type === 'element' && ['h3', 'h4', 'p'].includes(child.tagName)) {
      // A paragraph may hold several "Left | Right" lines separated by line breaks
      if (child.tagName === 'p' && child.children.some((c) => c.type === 'text' && c.value.includes('\n'))) {
        const lines = [];
        let current = [];
        for (const c of child.children) {
          if (c.type === 'text' && c.value.includes('\n')) {
            const parts = c.value.split('\n');
            parts.forEach((p, i) => {
              if (i > 0) { lines.push(current); current = []; }
              if (p) current.push({ type: 'text', value: p });
            });
          } else current.push(c);
        }
        lines.push(current);
        child.tagName = 'div';
        child.children = lines.map((l) => {
          const line = { type: 'element', tagName: 'p', properties: {}, children: l };
          splitNode(line);
          return line;
        });
      } else {
        splitNode(child);
      }
    } else {
      walk(child);
    }
  }
}

export function rehypeCv() {
  return (tree, file) => {
    if (file.data?.astro?.frontmatter?.layout !== 'cv') return;
    walk(tree);
  };
}
