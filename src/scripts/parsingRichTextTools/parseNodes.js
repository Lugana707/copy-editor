const parseNodes = (nodes, baseStyle = 'normal') => {
  let parsed = [];

  nodes.forEach((node) => {
    const {
      attribs, children, data, name,
    } = node;
    if (!name) {
      parsed = parsed.concat({
        style: baseStyle,
        content: data,
      });
    } else if (name === 'b') {
      parsed = parsed.concat(parseNodes(children, baseStyle === 'italic' ? 'bold-italic' : 'bold'));
    } else if (name === 'i') {
      parsed = parsed.concat(parseNodes(children, baseStyle === 'bold' ? 'bold-italic' : 'italic'));
    } else if (name === 'span') {
      const { style } = attribs;
      // The detection of attributes here might be too specific. Is this
      // really the best way to do this?
      const isItalic = !!style.match(/italic/);
      const isBold = !!style.match(/weight:600/);
      if (isItalic && !isBold) {
        parsed = parsed.concat(parseNodes(children, 'italic'));
      } else if (!isItalic && isBold) {
        parsed = parsed.concat(parseNodes(children, 'bold'));
      } else if (isItalic && isBold) {
        parsed = parsed.concat(parseNodes(children, 'bold-italic'));
      } else {
        parsed = parsed.concat(parseNodes(children, 'normal'));
      }
    }
  });

  return parsed;
};

export default parseNodes;
