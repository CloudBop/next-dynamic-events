import Document, { Html, Head, Main, NextScript } from "next/document";

// the default config MyDocument from nextjs
class MyDocument extends Document {
  render() {
    return (
      <Html>
        {/* THIS IS NOT THE SAME <Head/> as "next/head" */}
        <Head lang={"en"} />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
// overrides the default next MyDocument
export default MyDocument;
