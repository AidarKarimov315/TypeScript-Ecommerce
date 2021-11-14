import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="/assets/fonts/Comfortaa-Medium.woff" rel="preload" as="font" type="font/woff" />
          <link href="/assets/fonts/Comfortaa-Medium.woff2" rel="preload" as="font" type="font/woff2" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <div id="portal" data-testid="portalContainer" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
