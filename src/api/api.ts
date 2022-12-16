import { GraphQLClient } from "graphql-request";

const id = "clbm4n7xl0a7601tdbetf4tj8";
const endpoint = `https://api-ap-southeast-2.hygraph.com/v2/${id}/master`



const graphQLClient = new GraphQLClient(endpoint)

export {id,endpoint,graphQLClient}
