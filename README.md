# Instrument Closet React App


## Overview
This is a React frontend application that connects to a backend API ([find that here](https://github.com/bcdunn7/Instrument-Closet-Backend)). This is an instrument closet and reservation system. It's a specific implementation of a general inventory management system. It has standard user auth. You can query instruments, reservation, or make a reservation for instruments.

*Deployed Here:* [TheInstrumentCloset Surge Deployment](https://the-instrument-closet.surge.sh/)

## To Recreate
Required Tech: Node/npm

* Download/Clone git and navigate to file

    ```
    $ git clone https://github.com/bcdunn7/instrument-closet-react-app
    $ cd path-to-instrument-closet-react-app
    ```

* Install Dependencies

    ```
    $ npm install
    ```

* Run npm start

    ```
    $ npm start
    ```

* It is up and running! You can query it using Insomnia or any similar tool, or your own application!

* For typical cypress testing (\*some tests, especially e2e, require local backend to be up and running!):
    ```
    $ npm test
    ```

> NOTE! The e2e testing uses a seeded database of { username, password} of 'testuser' and 'password'. You will need to add this to your local backend if you want to run e2e.

* For component testing:
    ```
    $ npm run cy:ct
    ```

### **Tech Used:**
- React ([Create React App](https://github.com/facebook/create-react-app))
- Redux w/ Toolkit
- React Router
- Axios
- Formik
- Jsonwebtoken
- Luxon
- Full Calendar
- MUI
