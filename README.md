# FutureEd

## 📗 Table of Contents
- [📗 Table of Contents](#-table-of-contents)
- [📖 FutureEd](#about-project)
  - [🛠 Built With](#-built-with-)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [Deployment Link](#deployment-link)
  - [💻 Getting Started with Vite](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Install](#install)
  - [Available Scripts](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run build`](#npm-run-build)
  - [👥 Author](#-author-)
  - [🔭 Future Features](#-future-features-)
  - [🤝 Contributing](#-contributing-)
  - [⭐️ Show Your Support](#️-show-your-support-)
  - [🙏 Acknowledgments](#-acknowledgments-)
  - [📝 License](#-license)

# 📖 FutureEd <a name="about-project"></a>

**FutureEd** is a web application that simulates a payment process using [SparcoPay](https://www.sparcopay.com/) and [Paypal](https://www.paypal.com/us/webapps/mpp/payflow-payment-gateway) payment gateways and implements dynamic currency localization based on the user's selected location. It provides users with a seamless payment experience while dynamically displaying prices in their local currency.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>
<details>
  <summary>Programming languages</summary>
  <ul>
    <li><a href="https://www.javascript.com/">JavaScript</a></li>
  </ul>
 </details>
 
<details>
  <summary>Technologies</summary>
  <ul>
    <li><a href="https://git-scm.com/">Git</a></li>
    <li><a href="https://github.com/">Github</a></li>
    <li><a href="https://eslint.org/">Linters</a></li>
    <li><a href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow">Gitflow</a></li>
  </ul>
 </details>
 <details>
  <summary>Frameworks</summary>
  <ul>
    <li><a href="https://reactjs.org/">React</a></li>
    <li><a href="https://expressjs.com/">Express Js</a></li>
  </ul>
 </details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://nodejs.org/en">Node.js</a></li>
  </ul>
</details>

### Key Features
- Card payment integration.
- Mobile money payment integration.
- Dynamic currency conversion based on selected location.
- Responsive and visually appealing design.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Deployment Link

Live demo: [Coming soon]()

## 💻 Getting Started with Vite<a name="getting-started"></a>

This project was bootstrapped with [Vite](https://vitejs.dev/).

To get a local copy up and running, follow these steps.

### Prerequisites

- Install git on your computer.
- Install a code editor.
- And a web browser to view the output.

### Setup

Clone this repository to your desired folder:

 ```bash
cd my-folder
git clone https://github.com/c00p75/takehome-payment-gateway.git
 ```

### Install

Navigate to the directory with:

 ```bash
 cd my-project
 ```

To install the dependencies, run:

 ```bash
 npm install
 ```


### Setup environment variables
Create a .env file to store PayPal client id as well as Sparcopay public and secrete keys
```env
# Must-have for mobile money
SPARCO_PUB_KEY="YOUR_SPARCO_PUBLIC_KEY"
SPARCO_SEC_KEY="YOUR_SPARCO_SECRET_KEY"

# Must-have for PayPal
CLIENT_ID="YOUR_CLIENT_ID_GOES_HERE"
``````

## Available Scripts

In the project directory, run:

 ```bash
 npm start
 ```

This runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will re-render when you make changes.\
You may also see some lint errors in the console.

To install the dependencies, run:

 ```bash
 npm test
 ```

This launches the test runner in interactive watch mode.

 ```bash
 npm run build
 ```

This builds the app for production to the `build` folder.

## 👥 Author <a name="author"></a>

👤 **George M'sapenda**

- GitHub: [@github](https://github.com/c00p75)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/georgemsapenda/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

- **Utilize geolocation API to set the default currency based on a user's current location**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/c00p75/takehome-payment-gateway/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show Your Support <a name="support"></a>

Please consider giving a ⭐️ if you like this project!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgments <a name="acknowledgments"></a>

> Give credit to everyone who inspired your codebase.

I'd like to thank [ZONO ACADEMY](https://elearning.zonoacademy.com/) for providing the business requirements for this project.

P.S. Stack Overflow and Google 😉

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 📝 License

- This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Disclaimer

**Please Note:** This project is intended for demonstration purposes only. It is not associated with or representative of any real charity organization, and will process actual financial transactions.

**Do Not Send Real Money:** I want to emphasize that you should not send real money or make real financial transactions through this project. Any payment or transaction made within this project is solely for testing and simulation purposes, and the funds will be received by the project creator (George M'sapenda) for demonstration purposes only. I will not be responsible for any financial transactions made in error.

If you have any questions or concerns about the project, please feel free to create an issue for clarification.
