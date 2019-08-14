import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import withApolloClient from "../src/apolloClientWrapper";
import { ApolloClient } from "apollo-boost";
import { Auth0Provider } from "../src/auth0ClientWrapper";

interface Props {
  apollo: ApolloClient<{}>;
}

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Auth0Provider
            domain={"YOUR_AUTH0_DOMAIN"}
            client_id={"YOUR_AUTH0_CLIENTID"}
            redirect_uri={"http://localhost:3000"}
            onRedirectCallback={res => alert("I will redirect now..")}
          >
            <Component {...pageProps} />
          </Auth0Provider>
        </ApolloProvider>

        <style jsx global>{`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Helvetica, Arial, sans-serif, "Apple Color Emoji",
              /* Emojis*/ "Segoe UI Emoji", /* Emojis*/ "Segoe UI Symbol"; /* Emojis*/
          }
        `}</style>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
