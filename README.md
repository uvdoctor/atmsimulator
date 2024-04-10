# ATM Simulator UI

This simulator uses Micro-frontend (MFE) architecture using NextJS Server-side rendering (SSR) and Webpack dynamic module federation so that MFEs are loaded in the browser dynamically depending on customer need.

MFEs integrate with NextJS edge middleware (which executes before request is processed by APIs), and various APIs implemented using NodeJS. The solution can currently be deployed on localhost only, and uses managed hosting capability of NextJS. It can also be self-hosted.

The MFEs are split based on reusable functionality and business domain such as Account. New MFEs can also be integrated as needed for other business domains such as Billing, Servicing, Marketing, etc.

Here are the major components of this solution:

**_Shell:_**
atm-shell project implements the shell, which is responsible for bootstrapping the web application with various MFEs needed, loads the landing page, and also implements user authentication by leveraging login API.

**_Header-MFE:_**
atm-header-mfe project implements the header, which is leveraged by the shell and other MFEs

**_Account-MFE:_**
atm-account-mfe project implements account balance and cash withdrawal menu items as well as related features and API. Other account related features can also be implemented in the future in this project.

## What are the benefits of this approach?

**_Customer_**

- Customer can get personalized and intelligent experiences in real-time (no planned downtime needed).

- Even if a particular MFE has issue, other MFEs can continue working so that customers can continue using other features.

- Features can be selectively disabled depending on known issues. For instance, if a cash dispenser of a particular ATM isn't working, then cash withdrawal feature would be disabled just for that ATM. This provides a relatively better customer experience as the customer can be proactively informed about the concerned problem.

**_Agility_**

- Every component can be independently developed, tested, deployed and released to all / selected set of customers using feature toggles.

- Components can be deployed through a standard change process with smart governance controls so that production deployments happen at the end of every sprint.

- By differentiating between deployment and release, business can have required flexibility to release features for different components progressively to a certain group of friendly customers for early feedback.

- Styling can be updated consistently across all components to incorporate brand related styling upgrades.

**_Cost_**

- SSR helps to support various legacy browsers across existing ATMs while using latest React and other libraries on server-side as HTML is rendered on server-side and sent across to the client. This relaxes the need for browser upgrades to support modern web capabilities.

- Every component is brand-agnostic and can support dynamic theming through the shell so that appropriate brand theming is done consistenly across all components.

**_Security_**

- Vulnerabilities can be identified for various components, and only those components can be upgraded.

**_Colleagues_**

## What are the downsides and possible remediations of this approach?

## What is the strategic recommendation for modern frictionless customer experience for ATM related services?

## Which engineering practices should be / have been followed?

**_Engineer_**

**_Protect_**

**_Operate_**

## How can I run the code locally?
