// @flow
/**
 * Editable content area for rich text formatting that converts the formatted
 * text into a JSON representation of the text.
 */
import * as React from 'react';
import ContentEditable from 'react-contenteditable';
import JSONPretty from 'react-json-pretty';
import styled from 'styled-components';
import Colors from './constants/colors';
import Spacing from './constants/spacing';
import parseNodes from './scripts/parsingRichTextTools/parseNodes';
import parseHtml from './scripts/parsingRichTextTools/parseHtml';

const App = () => {
  const [html, setHtml] = React.useState('<div>Edit text here.</div>');
  const [parsed, setParsed] = React.useState(parseHtml(html));

  const handleChange = (e) => {
    setHtml(e.target.value);
  };

  React.useEffect(() => {
    const parsedHtml = parseHtml(html);
    setParsed(parsedHtml);
  }, [html]);

  return (
    <Wrapper>
      <ContentEditable
        html={html}
        onChange={handleChange}
        style={{
          flex: 1,
          maxWidth: '50vw',
          fontSize: '17px',
          fontFamily: 'sans-serif',
          fontWeight: 300,
          lineHeight: '24px',
          height: '100vh',
          borderRight: `1px solid ${Colors.offBlack}`,
          padding: `${Spacing.small}px`,
        }}
      />
      <Strut size={24} />
      <JSONPretty
        data={parsed}
        style={{
          flex: 1,
          overflowX: 'scroll',
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const Strut = styled.div`
  flex-basis: ${(props) => props.size}px;
`;

export default App;
