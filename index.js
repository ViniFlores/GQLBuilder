import gqlBuilder from './GqlBuilder.js'
import gql from "graphql-tag";

let builder = new gqlBuilder()

builder.addMutation({
  mutation: gql`
      mutation createTask(
          $id: ID!
          $string:    String
          $number:Int
          $dateString: String
          $dateTimeInput: _Neo4jInputDateTime
          $enum: TaskType!
      ) {
          CreateTask(
              id: $id
              string: $string
              number: $number
              dateString: $dateString
              dateTimeInput: $dateTimeInput
              enum: $enum
          ) {
              id
              name
              description
              type
          }
      }
  `,
  variables: {
    id: "1234-1234",
    string: "Uma string",
    number: 42,
    dateString: "2021-01-31T00:00:00",
    dateTimeInput: {
      formatted: "2021-01-3100:00:00"
    },
    enum: "MyEnum"
  }
})

builder.addMutation({
  mutation: gql`
      mutation createTask(
          $id: ID!
          $string:    String
      ) {
          CreateTask(
              id: $id
              string: $string
          ) {
              id
          }
      }
  `,
  variables: {
    id: "1234-1234",
    string: "Uma string",
  }
})

console.log(builder.generateMutationRequest().loc.source.body)