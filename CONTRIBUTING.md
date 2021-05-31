# Contributing to Mono Node.js Library

Thanks for contributing to Mono Node.js Library! 

## Issues

Mono Node.js is a thin wrapper around [Mono APIs](https://docs.mono.co/reference/documentation-intro). Please only file issues here that you believe
represent bugs with Mono Node.js, not Mono APIs.

If you're having general trouble with Mono Node.js or your Mono integration,
please reach out to us at <hi@mono.co> or
come chat with us on [Slack](https://join.slack.com/t/devwithmono/shared_invite/zt-gvkqczzk-Ldt4FQpHtOL7FFTqh4Ux6A). We're proud of our level of
service, and we're more than happy to help you out with your integration to Mono.

If you've found a bug in Mono Node.js, please [let us know](https://github.com/withmono/mono-node/issues/new)! You may
also want to check out our [issue template][issue-template].

## API review

At Mono, we scrutinize changes that affect the developer API. If your code change involves adding, removing, or modifying the surface area of the API, we ask that you go through an API review by following [this guide][api-review]. It's best to go through API review before implementing a feature. If you've already implemented a feature, address the [API review](https://github.com/withmono/mono-node/tree/main/.github/API_REVIEW.md) considerations within your pull request.

Going through an API review is not required, but it helps us to understand the
problem you are trying to solve, and enables us to collaborate and solve it
together.

## Code review

All pull requests will be reviewed by someone from Mono before merging. At
Mono, we believe that code review is for explaining and having a discussion
around code. For those new to code review, we strongly recommend [this
video](https://www.youtube.com/watch?v=PJjmw9TRB7s) on "code review culture."

## Developing

Install dependencies:

```sh
npm install
```

<!--

To be added

We use a number of automated checks:

- Flow, for adding types to JavaScript
  - `yarn run flow`
- Jest, for testing
  - `yarn test`
- ESLint, for assorted warnings
  - `yarn run lint`
- Prettier, for code formatting
  - `yarn run prettier`

You might want to configure your editor to automatically run these checks. Not
passing any of these checks will cause the CI build to fail.

-->

## Code of Conduct

Please be mindful of our [Code of Conduct](https://github.com/withmono/mono-node/tree/main/.github/CODE_OF_CONDUCT.md). This is your community, treat others with respect.
