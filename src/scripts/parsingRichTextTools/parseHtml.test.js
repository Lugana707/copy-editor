import parseHtml from './parseHtml';

describe('parseHtml', () => {
  describe('with no Html', () => {
    it('returns an empty array', () => {
      const results = parseHtml('');

      expect(results).toHaveLength(0);
    });
  });

  describe('with basic content', () => {
    const content = 'Hello World!';

    const getTestResults = ({ style }) => [
      {
        content: [
          {
            style,
            content,
          },
        ],
      },
    ];

    [
      { style: 'italic', html: `<div><i>${content}</i></div>` },
      { style: 'bold', html: `<div><b>${content}</b></div>` },
      { style: 'bold', html: `<div><span style="weight:600">${content}</span></div>` },
      { style: 'bold-italic', html: `<div><i><b>${content}</b></i></div>` },
      { style: 'bold-italic', html: `<div><b><i>${content}</i></b></div>` },
      { style: 'normal', html: `<div>${content}</div>` },
    ].map(({ style, html }) => {
      describe(`with ${style} nodes`, () => {
        it(`returns array with ${style} nodes`, () => {
          expect(parseHtml(html)).toEqual(getTestResults({ style }));
        });
      });
    });
  });
});
