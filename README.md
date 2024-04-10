# ATM Simulator UI

This simulator uses Micro-frontend (MFE) architecture using NextJS Server-side rendering (SSR) and Webpack dynamic module federation so that MFEs are loaded in the browser dynamically depending on customer need. MFEs integrate with NextJS edge middleware (which executes before request is processed by APIs), and various APIs implemented using NodeJS. The solution can currently be deployed on localhost only, and uses managed hosting capability of NextJS. It can also be self-hosted.

The MFEs are segregated based on reusable functionality and business domain.

Here are the major components of this solution:

**_Shell_**
atm-shell project implements the shell, which is responsible for bootstrapping the web application with various MFEs needed, loads the landing page, and also implements user authentication by leveraging login API.

**_Header-MFE_**
atm-header-mfe project implements the header, which is leveraged by the shell and other MFEs

**\_Account-balance-MFE**
atm-account-mfe project implements account balance menu item as well as related features and API.

**_Cash-MFE_**
atm-cash-mfe project implements cash withdrawal menu item as well as related features and API. Cash deposit related feature can also be implemented through this API in the future.

## What are the benefits of this approach?

**_Customer_**

- Customer can get personalized and intelligent experiences in real-time (no planned downtime needed) using MFE architecture.

- SSR helps to support various legacy browsers across existing ATMs while using latest React and other libraries on server-side as HTML is rendered on server-side and sent across to the client by NextJS framework.

**_Agility_**

**_Cost_**

**_Security_**

**_Colleagues_**

## What are the downsides and possible remediations of this approach?

## What is the strategic recommendation for modern frictionless customer experience for ATM related services?

## Which engineering practices should be / have been followed?

**_Engineer_**

**_Protect_**

**_Operate_**

## How can I run the code locally?
