/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: filterPosts
// ====================================================

export interface filterPosts_filterPosts {
  __typename: "Post";
  id: string;
}

export interface filterPosts {
  filterPosts: filterPosts_filterPosts[] | null;
}

export interface filterPostsVariables {
  searchString: string;
}
