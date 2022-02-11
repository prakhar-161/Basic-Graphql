Learnings - 

1) Designing graphql schemas

2) Typedefs and Resolvers for them

3) Queries and Mutations

4) When a query contains a field whose type is not native(or scalar) or of its own field type, we create a new resolver for the field. 
   In this tutorial, we created User resolver which contains favouriteMovies field, whose type is Movie and is written inside the User type.

5) Querying all the data of a particular type in the client-side with help of useQuery hook.

6) Query for a single entity using useLazyQuery.

7) useMutations and refetch()

8) Context, Fragments and Error handling using Union Result Boxes.

---------------------------------------
Fragments example - (on client-side)
Query ExampleQuery {
	users {
		…GetAgeAndName
	}
}

Fragment GetAgeAndName on User {
	name
	age
}