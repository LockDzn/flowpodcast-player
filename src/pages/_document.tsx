import Document, { DocumentProps, Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render(): JSX.Element {
        return (
        <Html lang="pt-br">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
        );
    }
}

export default MyDocument;