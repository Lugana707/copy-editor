import ReactHtmlParser from 'react-html-parser';
import parseNodes from './parseNodes';

export default (html) => ReactHtmlParser(html, {
  transform: (node) => {
    const { children, name, parent } = node;
    if (!parent && name === 'div') {
      const parsed = parseNodes(children);
      return parsed.length > 0
        ? {
          content: parsed,
        }
        : null;
    }
    return null;
  },
}).filter((node) => !!node);
