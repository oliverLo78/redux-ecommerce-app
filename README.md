# 22 State: Redux Store (Extra Credit)

## Your Task

In this module, you learned how to manage global state using React’s Context API. The Context API is quickly gaining traction as a worthy alternative or perhaps even successor to other libraries that manage global state in tandem with React, such as Flux or MobX. Nonetheless, the open source JavaScript library Redux remains the industry standard for managing complex state in a large-scale React application, and you’ll likely encounter it on the job.

Your challenge this week is to refactor the e-commerce platform from [Activity 26](../01-Activities/26-Stu_Actions-Reducers/Unsolved) so that it uses [Redux](https://redux.js.org/). You won’t need to make sweeping changes to the code, but you will need to read through the Redux documentation on your own to find the information you need. Some guidelines have been provided in the Getting Started section to point you in the right direction. If you haven't yet, download the [e-commerce platform code from Activity 26](http://static.fullstack-bootcamp.com/fullstack-ground/unit-22/26-Stu_Actions-Reducers.zip).

**On the Job**: Web developers frequently have to immerse themselves in a new technology to solve a problem, with only that tool’s documentation for help. They must sift through it to find the information that matches the specific problem they’re trying to solve. This assignment will allow you to practice a skill that you’ll use many times over the course of your career.

Remember, this module's Challenge is extra credit. It is not required for submission, nor will it count towards one of the two assignments that you can skip. If you choose to submit this Challenge, you will receive extra credit points on your final grade. However, if you choose not to submit it, your final grade will not be affected in any way. This Challenge is an opportunity for you to further practice your skills and get feedback on it, with the added incentive of receiving extra credit for the work.

## User Story

```
AS a senior engineer working on an e-commerce platform
I WANT my platform to use Redux to manage global state instead of the Context API
SO THAT my website's state management is taken out of the React ecosystem
```

## Acceptance Criteria

```
GIVEN an e-commerce platform that uses Redux to manage global state
WHEN I review the app’s store
THEN I find that the app uses a Redux store instead of the Context API
WHEN I review the way the React front end accesses the store
THEN I find that the app uses a Redux provider
WHEN I review the way the app determines changes to its global state
THEN I find that the app passes reducers to a Redux store instead of using the Context API
WHEN I review the way the app extracts state data from the store
THEN I find that the app uses Redux instead of the Context API
WHEN I review the way the app dispatches actions
THEN I find that the app uses Redux instead of the Context API
```

## Mock-Up

This section reviews the web application's general appearance and functionality.

The following animation shows how a user can register using the Signup page and then navigate to the Products page:

![](./client/src/assets/Screenshot%202025-01-08%20131508.png)

As user registers on the Signup page and then navigates to the Products page, which displays images and descriptions of products.

![](./client/src/assets/Screenshot%202025-01-08%20124733.png)

The following animation shows how the user can select a category, choose a product, view details about it on the product page, and add and remove it from their shopping cart:

![](./client/src/assets/Screenshot%202025-01-08%20124848.png) The user selects a category, chooses a product, views details about it on the product page, and adds it to and removes it from their shopping cart.

Finally, the user can check out by going to their shopping cart, as shown in the following animation:

![]The user checks out by going to their shopping cart.

## Getting Started

For instructions to add Redux to your application, refer to the [Redux Fundamentals basic tutorial](https://redux.js.org/basics/basic-tutorial). Note that the documentation will refer to additional packages that you'll need to complete this implementation.

Be sure to review ALL of the documentation, because there are newer methods that can make these tools much easier to implement. React has gone through several iterations; as such, some React-and-Redux tutorials will assume that you aren't using Hooks.

You'll use the Stripe API to process payments, which includes making front-end and back-end changes. Don't worry, Stripe provides test credentials, so you won't need to use a real credit card to try it out. Refer to the [Stripe docs on testing your integration](https://stripe.com/docs/testing).

**Important**: The Challenge requires a specific version `(>=7.0)` of `npm` in order to install peer dependencies like GraphQL when deploying to Heroku. By default, Heroku uses `npm 6.x`, which may cause some issues. Be sure to refer to the [Heroku Docs on Specifying an NPM Version](https://devcenter.heroku.com/articles/nodejs-support#specifying-an-npm-version) to ensure your `package.json` file is set up correctly, as shown in the following snippet:

  ```json
  {
    "engines": {
      "npm": "7.x"
    }
  }
  ```
## Testing reducer operations with Redux DevTools

To interactively validate each action in the Redux store, follow the workflow documented in [`docs/redux-devtools-testing.md`](docs/redux-devtools-testing.md). The guide explains how to dispatch slice actions (for example, the cart and category operations defined under `client/src/redux`) straight from the Redux DevTools browser extension and inspect the resulting state changes in real time.

# Testing Redux Operations with Redux DevTools

The Redux DevTools browser extension makes it easy to exercise every reducer operation that your store exposes without needing to write ad-hoc UI wrappers. Because the app's store is configured with `configureStore` from Redux Toolkit, the DevTools extension is automatically enabled in development builds as soon as the app is running locally (`npm start`).

## 1. Launch the app and open DevTools
1. Run the client: `npm start` from the repository root.
2. Open your browser's Redux DevTools extension while the app is loaded.
3. On the left sidebar, switch to the **Actions** tab so you can dispatch operations.

## 2. Dispatch actions from the extension
The extension allows you to manually dispatch any action creator exported by the slices in `client/src/redux`. For example:

- To test the category reducer, dispatch `category/updateCurrentCategory` with a payload that mirrors a category object from the GraphQL API.
- To test the cart reducer, dispatch `cart/addToCart`, `cart/removeFromCart`, or `cart/toggleCart` with the same payloads your UI would normally pass.

1. Click **Dispatch** in the DevTools extension.
2. Paste an action JSON object. For example:
   ```json
   {
     "type": "cart/addToCart",
     "payload": {
       "_id": "abc123",
       "name": "Running Shoes",
       "price": 89.99,
       "purchaseQuantity": 1
     }
   }
   ```
3. Submit the dispatch and watch the **State** tab update to reflect the new cart contents.

## 3. Inspect state changes
Every action you dispatch from the DevTools records a before/after snapshot. Use the action list to:

- Verify the payload shape that each reducer expects.
- Jump back and forth between actions to time-travel and confirm that undo/redo produces the right state transitions.
- Confirm derived selectors in your components by comparing the updated state to what renders on screen.

## 4. Re-run operations from test cases
When a failing test references an action, you can replay the same action in DevTools to inspect the live state tree. The component tests under `client/src/__tests__` show real payloads used by the UI, such as the category selection dispatch verified in `CategoryMenu.test.js`. Use those payloads as templates when dispatching by hand.

## 5. Export and share action traces
The DevTools extension supports exporting the entire session as JSON. Use the export button to capture the sequence of operations you tested. Sharing this JSON makes it easy for teammates to import the trace and reproduce the same reducer transitions locally.

By following these steps, you can validate every reducer operation through Redux DevTools without modifying application code, ensuring state logic behaves as expected.

## Troubleshooting

## Resolving `npm ERR! ERESOLVE could not resolve`

When `npm install` fails with a peer dependency conflict similar to the following output:

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR! While resolving: mern-shopping@1.0.0
npm ERR! Found: react@18.3.1
...
npm ERR! Could not resolve dependency:
npm ERR! dev @testing-library/react-hooks@"*" from the root project
npm ERR! Conflicting peer dependency: react@17.0.2
```

it means that the local workspace has a version of React (`18.3.1` in the example) that is incompatible with `@testing-library/react-hooks@8.0.1`. That testing helper only lists React 16 and 17 as supported peer dependencies, so npm aborts rather than installing a mismatched set of packages.

This project is pinned to React 16.13.1 in `client/package.json`, so the safest fix is to realign your local installation with the versions checked into the repository. From the project root, run:

```bash
rm -rf client/node_modules package-lock.json
cd client
rm -rf node_modules package-lock.json
npm install react@16.13.1 react-dom@16.13.1
npm install
```

The first two commands remove any cached dependencies that might still reference React 18. The `npm install` commands then reinstall the exact React versions expected by the test utilities and the rest of the application.

If you cannot remove React 18—for example, because another branch explicitly upgrades the client—replace `@testing-library/react-hooks` with the `renderHook` helpers that ship in `@testing-library/react@13` or newer. That modern API fully supports React 18 and avoids the peer dependency constraint altogether.

## Grading Requirements

> **Note**: If a Challenge assignment submission is marked as “0”, it is considered incomplete and will not count towards your graduation requirements. Examples of incomplete submissions include the following:
>
> * A repository that has no code
>
> * A repository that includes a unique name but nothing else
>
> * A repository that includes only a README file but nothing else
>
> * A repository that only includes starter code

This Challenge is graded based on the following criteria:

### Technical Acceptance Criteria: 40%

* Satisfies all of the preceding acceptance criteria plus the following:

  * Retains all the functionality of the original application.

  * Application must be deployed to Heroku.

### Deployment: 32%

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository contains application code.

### Application Quality: 15%

* User experience is intuitive and easy to navigate.

* User interface style is clean and polished.

* Application resembles the mock-up functionality provided in the Challenge instructions.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains high-quality README file with description, screenshot, and link to the deployed application.

## Review

You are required to submit BOTH of the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository, with a unique name and a README describing the project.

- - -
© 2022 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
