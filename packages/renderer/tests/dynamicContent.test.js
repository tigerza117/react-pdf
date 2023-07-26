import { Document, Image, Page, View, Text, Font } from '..';
import renderToImage from './renderComponent';

const mount = async children => {
  const image = await renderToImage(
    <Document>
      <Page size={[244, 280]}>{children}</Page>
    </Document>,
  );

  return image;
};

describe('dynamic content', () => {
  test('should render an image', async () => {
    const url =
      'https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png';
    const image = await mount(
      <View
        render={() => <Image src={url} style={{ width: 244, height: 280 }} />}
      />,
    );

    expect(image).toMatchImageSnapshot();
  }, 10000);
});

describe('dynamic content emoji', () => {
  test('dynamic content emoji should support builder function', async () => {
    Font.registerEmojiSource({
      builder: code =>
        `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${code.toLowerCase()}_3d.png`,
    });

    const image = await renderToImage(
      <Document>
        <Page size={[100, 100]}>
          <Text style={{ fontSize: 80 }} render={() => '💩'} />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('dynamic content emoji should support Unicode 13.0 emoji', async () => {
    Font.registerEmojiSource({
      format: 'png',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
    });

    const image = await renderToImage(
      <Document>
        <Page size={[100, 100]}>
          <Text style={{ fontSize: 80 }} render={() => '🦫'} />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('dynamic content emoji should render under view', async () => {
    Font.registerEmojiSource({
      format: 'png',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
    });

    const image = await renderToImage(
      <Document>
        <Page size={[100, 100]}>
          <View style={{ fontSize: 80 }} render={() => <Text>🦫</Text>} />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });
});
