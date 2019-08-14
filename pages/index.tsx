import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import {
  filterPosts,
  filterPostsVariables
} from "../src/graphql/generated/filterPosts";
import { FILTER_POSTS } from "../src/graphql/queries";
import { useAuth0 } from "../src/auth0ClientWrapper";

class FilterPostsQuery extends Query<filterPosts, filterPostsVariables> {}

const Test = styled.h1`
  color: green;
`;
const Index = () => {
  const { loading, isAuthenticated } = useAuth0();
  if (!loading) {
    useAuth0()
      .loginWithRedirect({ display: "touch", ui_locales: "de" })
      .then(res => {
        console.log(res);
      });
  }

  return (
    <FilterPostsQuery
      query={FILTER_POSTS}
      variables={{ searchString: "te" }}
      ssr={false}
    >
      {({ data, loading, error }) => {
        if (loading) return <Test>Loading</Test>;
        if (error) return <Test>{error}</Test>;
        if (data)
          return (
            <>
              <Test>{data.filterPosts && data.filterPosts[0].id}</Test>

              <h1>isAuthenticated: {isAuthenticated}</h1>
            </>
          );
      }}
    </FilterPostsQuery>
  );
};

export default Index;
