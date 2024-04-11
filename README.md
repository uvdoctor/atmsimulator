# ATM Simulator UI

<a href="#approach">High-level approach</a>

<a href="#benefits">Benefits</a>

<a href="#downsides">Downsides and possible remediations</a>

<a href="#strategic">Strategic recommendation for ATM related services</a>

<a href="#practices">Best practices should be / have been followed</a>

<a href="#run">Run the code locally</a>

## <a name="approach">High-level approach</a>

The solution assumes that a browser can be packaged securely within an ATM, and hence relies on web application for UI.

This simulator uses Micro-frontend (MFE) architecture using NextJS Server-side rendering (SSR) and Webpack dynamic module federation so that MFEs are loaded in the browser dynamically depending on customer and business need. This also allows MFEs to be upgraded in real-time without the need for redeploying other dependent MFEs / shell.

MFEs integrate with NextJS edge middleware (which executes before request is processed by APIs), and various APIs implemented using NodeJS. The solution can currently be deployed on localhost only, and uses managed hosting capability of NextJS. It can also be self-hosted.

The MFEs are split based on reusable functionality (eg: Header) and business domain (eg: Account), and managed independently by scrum teams such that no MFE ownership spans across teams. New MFEs can also be integrated as needed for other business domains such as Billing, Servicing, Marketing, etc.

Here are the major components of this solution:

**_Shell:_**
atm-shell project implements the shell, which is responsible for bootstrapping the web application with various MFEs needed, loads the landing page, and also implements user authentication by leveraging login API.

**_Header-MFE:_**
atm-header-mfe project implements the header, which is leveraged by the shell and other MFEs

**_Account-MFE:_**
atm-account-mfe project implements account balance and cash withdrawal menu items as well as related features and API. Other account related features can also be implemented in the future in this project.

## <a name="benefits">Benefits</a>

There are major benefits such as better customer experience, improved agility, faster innovation, lower Total Cost of Ownership (TCO), improved security and better colleague experience.

**_1. Better customer experience_**

- MFEs with SSR can be personalized by customer / ATM as response can be dynamically generated on server side, thereby providing more relevant and personalized customer experience

- Customer can get real-time (no planned downtime needed) and frequent upgrades for progressively better experience.

- Even if a particular MFE has issue, other MFEs can continue working so that customers can continue using other features.

- Features can be selectively disabled for a customer / ATM depending on known issues. For instance, if a cash dispenser of a particular ATM isn't working, then cash withdrawal feature would be disabled just for that ATM. This provides a relatively better customer experience as the customer can be proactively informed about the concerned problem.

**_2. Improved agility_**

- Every component can be independently developed, tested, deployed and released even during business hours.

- Components can be deployed through a standard change process with smart governance controls so that production deployments happen at the end of every sprint.

- By differentiating between deployment and release, business can have required flexibility to release features for different components progressively to a certain group of friendly customers for early feedback.

- Risk-based testing practices can be followed so that each MFE change can be validated based on the underlying risk of that change for the specific component rather than regression testing every change for the entire application. Also, every MFE can be spun up independently in a browser without the need of shell. Such practices can drastically automate testing and reduce the time needed for validating component-level changes.

**_3. Faster innovation_**

- A team can independently experiment and leverage recent innovations in the fast-paced web development space for independent MFEs, without impacting other teams and the overall application (considering guardrails are followed).

- Reusable components can be easily shared through MFE architecture thereby spreading innovation and best practices quickly across different projects.

**_4. Lower Total Cost of Ownership (TCO)_**

- MFEs can be reused across different channels (assuming those channels have been enabled for MFE architecture) and brands, thereby reducing total cost of ownership in the long-term.

- Every component can be independently changed (with appropriate guardrails) without need for retesting the entire application.

- SSR helps to support various legacy browsers across existing ATMs while using latest React and other libraries on server-side as HTML is rendered on server-side and sent across to the client. This relaxes the need for browser upgrades to support modern web capabilities.

- Every component can be made brand-agnostic with support for dynamic theming through the shell so that appropriate branding is done consistenly across all components by changing theme once in the shell.

**_5. Improved security_**

- Vulnerabilities can be identified for various components, and only those components can be upgraded.

- As ReactJS and other Javascript libraries are executed on the server side, this reduces the scope of Cross-site scripting attacks (XSS)

- API endpoints can be rewritten through middleware, thereby masking the actual endpoints used in the code running in browser.

**_6. Better colleague experience_**

- Scrum teams are empowered to change and release components thereby giving better control, accountability and visibility of customer outcomes.

- Colleagues can deploy changes frequently even during business hours with real-time updates to customers. Hence, this obviates the need for weekend releases.

- As frequent deployments and releases enable early customer feedback, colleagues get a much better and shorter feedback loop thereby reducing the risk of developing something that's not useful for customers, and increases the probability of much better customer impact.

- Each MFE can be managed independently by a team thereby reducing cross-team dependencies and coordination effort.

- Teams can adopt new libraries that they want to innovate with or are comfortable with, without burdening expectations from other teams. To demonstrate this in the solution, the shell projects uses Typescript while other projects don't use it.

## <a name="downsides">Downsides and possible remediations</a>

This architecture also has some downsides, which can be remediated to a large extent as mentioned below:

**_1. Increased server cost:_** Due to SSR, NodeJS servers need to be provisioned, maintained and scaled. Hence this leads to more server processing related cost compared to Client-side rendering (CSR) which is used in Single Page Application (SPA). However, this cost is insignificant given that browser upgrades can be minimized on ATMs, while still using latest web development related features, security and innovation on server side.

**_2. Lower run-time performance:_** As MFEs are loaded on-demand, this can potentially lead to lower performance compared to CSR as no network trip is involved. However, given lower bundle size of each MFE and simpler rendering requirements for ATMs, this isn't much of a concern.

**_3. Increased operational complexity:_** Given that every MFE can be independently deployed and released, this increases the operational complexity for managing various MFEs. However, this can be mitigated through extensive automation across SDLC (testing, CI/CD, observability, etc).

**_4. Increased learning curve:_** An organization may not have teams that are skilled with SSR and MFE architecture. Hence, it will require some investment and time to adopt this architecture. However, this will also lead to better overall quality of web development and fit-for-purpose architecture as teams will be able to apply CSR and/or SSR & MFE architecture depending on use cases.

## <a name="strategic">Strategic recommendation for ATM related services</a>

Strategic recommendation for modern frictionless customer experience is move to virtual ATMs (supported through existing networks and cash provider networks for cash withdrawal and deposit) rather than physical ATMs. Required authentication can be done via mobile app. This will be win-win considering better customer experience and convenience, and cost reduction due to requirement of a much lower footprint of physical ATMs.

## <a name="practices">Best practices should be / have been followed</a>

**_Engineer_**

- Behaviour driven development (BDD) practices for ensuring that implementation aligns with acceptance criteria mentioned in the requirements

- Better code quality using automated static analysis, shift-left test automation & coverage reports, vulnerability scanning, etc.

- Shift-left test automation can do most of validation as a part of check-in and CI pipeline using a combination of unit tests with mocking, integration tests, contract tests, snapshot tests, accessibility tests, cross-browser tests, etc. (partially implemented - unit tests with mocking for some parts of the codebase)

- Documentation of how to use reusable components through storybook scenarios

- In case of self-hosting, Content Delivery Network (CDN) can be used for global and efficient delivery of static content. Automated horizontal scaling can be used for API with blue/green support. Another self-hosting option could be to use hybrid model with containers for frequently used services like account balance, while serverless architecture for certain features (eg: cash deposit, withdrawal, etc) that are used relatively lesser. The back-end infrastructure can be fronted by an API gateway with routing, middleware, authentication, etc.

- Relevant documentation through comments in code as well as automated test scenarios and assertions

**_Protect_**

- Mutual TLS v1.3 certificates for client and server identity, and to protect data in transit

- AES-256-GCM for protecting sensitive data at rest (partially implemented for atm pin)

- Salted password hashes to reduce risk of password data hacks

- Same-site http-only cookies for reducing scope of Cross-site scripting (XSS) and Cross-site request forgery (CSRF) attacks (implemented)

- 1 minute / 1 transaction cookie expiry limit so that user is logged out as soon as transaction is completed or 1 minute has expired since login. This reduces the scope of reusing a user's session by someone else inadvertently. (implemented)

**_Operate_**

- Full stack observability, including monitoring, for proactive troubleshooting

- Automated pipeline for delivering changes with appropriate guardrails (partially implemented for localhost dev and prod)

- Automated user behaviour insights using analytics (partially implemented)

- Secret management through a vault solution, which is integrated with CD pipeline

- Different property files for different environments so that its easy to change values for an environment

- Resiliency through MFE architecture supplemented with React ErrorBoundary so that blast radius of errors is properly contained with fallback experience that can be displayed to customers

- Clearly defined API contracts, which are a part of well-documented service catalogue with service owners, RTO, RPO, etc

## <a name="run">Run the code locally</a>

- Ensure that required dependencies such as NodeJS, NPM, etc are installed

- Checkout the project locally

- Run "npm install" for every project so that required dependency modules are downloaded

- Run "npm run dev" for running project in development environment

- Run "npm run build" for optimized project build for production, and then "npm run start" for production deployment

- Run automated testing using "npm run test"

The shell and MFEs have been configured on different ports as mentioned below. HTTPS hasn't been implemented so that its easier to check out and run the project without the need for certificate store and certificates on local machine. However, HTTPS using TLS 1.3 would be highly recommended.

Shell: http://localhost:3000

Account MFE: http://localhost:3001

Header MFE: http://localhost:3002
