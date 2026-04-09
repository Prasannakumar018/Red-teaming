
 ->GraphQL vulnerabilities generally arise due to implementation and design flaws. For example, the introspection feature may be left active, enabling attackers to query the API in order to glean information about its schema.


# What is GraphQL?

1) GraphQL is an API query language that is designed to facilitate efficient communication between clients and servers. It enables the user to specify exactly what data they want in the response, helping to avoid the large response objects and multiple calls that can sometimes be seen with REST APIs.

2) GraphQL services define a contract through which a client can communicate with a server. The client doesn't need to know where the data resides. Instead, clients send queries to a GraphQL server, which fetches data from the relevant places. As GraphQL is platform-agnostic, it can be implemented with a wide range of programming languages and can be used to communicate with virtually any data store.

3) The data described by a GraphQL schema can be manipulated using three types of operation:

- Queries fetch data.
- Mutations add, change, or remove data.
- Subscriptions are similar to queries, but set up a permanent connection by which a server can proactively push data to a client in the specified format.

## GraphQL schema:

-> The `!` operator indicates that the field is non-nullable when called (that is, mandatory).


#Example schema definition 

type Product { 
			id: ID! 
			name: String! 
			description: String! 
			price: Int 
		}



![[Pasted image 20250706213350.png]]

