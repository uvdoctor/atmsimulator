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

There are major benefits for better customer experience, improved agility, lower maintenance cost, improved security and better colleague experience.

**_1. Better customer experience_**

- Customer can get personalized and intelligent experiences in real-time (no planned downtime needed) with frequent upgrades for progressively better experience.

- Even if a particular MFE has issue, other MFEs can continue working so that customers can continue using other features.

- Features can be selectively disabled depending on known issues. For instance, if a cash dispenser of a particular ATM isn't working, then cash withdrawal feature would be disabled just for that ATM. This provides a relatively better customer experience as the customer can be proactively informed about the concerned problem.

**_2. Improved agility_**

- Every component can be independently developed, tested, deployed and released even during business hours.

- Components can be deployed through a standard change process with smart governance controls so that production deployments happen at the end of every sprint.

- By differentiating between deployment and release, business can have required flexibility to release features for different components progressively to a certain group of friendly customers for early feedback.

**_3. Lower maintenance cost_**

- Every component can be independently changed (with appropriate guardrails) and monitored for troubleshooting.

- SSR helps to support various legacy browsers across existing ATMs while using latest React and other libraries on server-side as HTML is rendered on server-side and sent across to the client. This relaxes the need for browser upgrades to support modern web capabilities.

- Every component can be made brand-agnostic with support for dynamic theming through the shell so that appropriate branding is done consistenly across all components by changing theme once in the shell.

**_4. Improved security_**

- Vulnerabilities can be identified for various components, and only those components can be upgraded.

**_5. Better colleague experience_**

- Scrum teams are empowered to change and release components thereby giving better control, accountability and visibility of customer outcomes.

- Colleagues can deploy changes frequently even during business hours with real-time updates to customers. Hence, this obviates the need for weekend releases.

- As frequent deployments and releases enable early customer feedback, colleagues get a much better and shorter feedback loop thereby reducing the risk of developing something that's not useful for customers, and increases the probability of much better customer impact.

## <a name="downsides">Downsides and possible remediations</a>

## <a name="strategic">Strategic recommendation for ATM related services</a>

Strategic recommendation for modern frictionless customer experience is move to virtual ATMs (supported through existing networks and cash provider networks for cash withdrawal and deposit) rather than physical ATMs. Required authentication can be done via mobile app. This will be win-win considering better customer experience and convenience, and cost reduction due to requirement of a much lower footprint of physical ATMs.

## <a name="practices">Engineering practices should be / have been followed</a>

**_Engineer_**

- Better code quality using automated static analysis, shift-left test automation & coverage reports, vulnerability scanning, etc. Test automation can do most of validation as a part of CI pipeline using a combination of unit tests, integration tests, snapshot tests, accessibility tests, etc. (partially implemented)

- In case of self-hosting, Content Delivery Network (CDN) can be used for global and efficient delivery of static content. Automated horizontal scaling can be used for API with blue/green support. Another self-hosting option could be to use hybrid model with containers for frequently used services like account balance, while serverless architecture for certain features (eg: cash deposit, withdrawal, etc) that are used relatively lesser. The back-end infrastructure can be fronted by an API gateway with routing, middleware, authentication, etc.

**_Protect_**

- Mutual TLS v1.3 for client and server identity, and protecting data in transit

- AES-256-GCM for protecting data at rest (partially implemented)

- Salted password hashes to reduce risk of password data hacks

- Same-site http-only cookies for reducing scope of Cross-site scripting (XSS) and Cross-site request forgery (CSRF) attacks (implemented)

- 1 minute / 1 transaction cookie expiry limit so that user is logged out as soon as transaction is completed or 1 minute has expired since login. This reduces the scope of reusing a user's session by someone else inadvertently. (implemented)

**_Operate_**

- Observability using Open Telemetry for static content and APIs

- Automated pipeline for delivering changes with appropriate guardrails (partially implemented for localhost dev and prod)

- Automated user behaviour insights using analytics (partially implemented)

## <a name="run">Run the code locally</a>
