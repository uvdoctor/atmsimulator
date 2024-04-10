# ATM Simulator UI

<a href="#approach">High-level approach</a>

<a href="#benefits">Benefits</a>

<a href="#downsides">Downsides and possible remediations</a>

<a href="#strategic">Strategic recommendation for ATM related services</a>

<a href="#practices">Engineering practices should be / have been followed</a>

<a href="#run">Run the code locally</a>

## <a name="approach">High-level approach</a>

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

## <a name="benefits">Benefits</a>

**_Customer_**

- Customer can get personalized and intelligent experiences in real-time (no planned downtime needed).

- Even if a particular MFE has issue, other MFEs can continue working so that customers can continue using other features.

- Features can be selectively disabled depending on known issues. For instance, if a cash dispenser of a particular ATM isn't working, then cash withdrawal feature would be disabled just for that ATM. This provides a relatively better customer experience as the customer can be proactively informed about the concerned problem.

**_Agility_**

- Every component can be independently developed, tested, deployed and released even during business hours.

- Components can be deployed through a standard change process with smart governance controls so that production deployments happen at the end of every sprint.

- By differentiating between deployment and release, business can have required flexibility to release features for different components progressively to a certain group of friendly customers for early feedback.

**_Cost_**

- SSR helps to support various legacy browsers across existing ATMs while using latest React and other libraries on server-side as HTML is rendered on server-side and sent across to the client. This relaxes the need for browser upgrades to support modern web capabilities.

- Every component can be made brand-agnostic with support for dynamic theming through the shell so that appropriate branding is done consistenly across all components by changing theme once in the shell.

**_Security_**

- Vulnerabilities can be identified for various components, and only those components can be upgraded.

**_Colleagues_**

## <a name="downsides">Downsides and possible remediations</a>

## <a name="strategic">Strategic recommendation for ATM related services</a>

Strategic recommendation for modern frictionless customer experience is move to virtual ATMs (supported through existing networks and cash provider networks for cash withdrawal and deposit) rather than physical ATMs. Required authentication can be done via mobile app. This will be win-win considering better customer experience and convenience, and cost reduction due to requirement of a much lower footprint of physical ATMs.

## <a name="practices">Engineering practices should be / have been followed</a>

**_Engineer_**

**_Protect_**

**_Operate_**

## <a name="run">Run the code locally</a>
