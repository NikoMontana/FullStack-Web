import gql from 'graphql-tag';

export const FILTER_POSTS = gql`
query filterPosts($searchString: String!) {
  filterPosts(searchString: $searchString) {
    id
  }
}
`;