import React from 'react';
import './App.css';

// Importér komponenter til routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Importér Apollo Client og Apollo Provider
import client from './config/apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';

// Importér Reactstrap komponenter
import { Container } from 'reactstrap';

// Importér egne komponenter uden auth-beskyttelse
import Header from './components/header/Header';
import Textarea from './components/textarea/Textarea';
import LoginForm from './components/loginForm/LoginForm';
import Scooters from './components/scooters/Scooters';
import ChooseModel from './components/chooseModel/ChooseModel';
import ChooseSubCategory from './components/chooseSubCategory/ChooseSubCategory';
import Contact from './components/contact/Contact';
import ShowSubCategory from './components/showSubCategory/ShowSubCategory';
import ShowSparepart from './components/showSparepart/ShowSparepart';
import NotFound from './components/notFound/NotFound';

// Importér egne komponenter med auth-beskyttelse
import AdminNav from './components/adminNav/AdminNav';
import Welcome from './components/welcome/Welcome';
import Mail from './components/mails/Mail';
import MailLandingPage from './components/mails/MailLandingPage';
import EditTextarea from './components/editTextarea/EditTextarea';
import Products from './components/products/Products';
import ShowScooter from './components/showScooter/ShowScooter';
import { GetScooterById } from './components/editScooter/EditScooter';
import { GetSparepartById } from './components/editSparepart/EditSparepart';
import AddNewScooter from './components/addNewScooter/AddNewScooter';
import AddNewSparepart from './components/addNewSparepart/AddNewSparepart';
import AddNewUser from './components/addNewUser/AddNewUser';
import Categories from './components/categories/Categories';

// App-komponentet indeholder den samlede app, der renderes i index.js
function App() {
  // Definér angivelsen af Auth route
  const Auth = ({ render: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          window.location.replace('/login')
        )
      }
    />
  );

  return (
    <Router>
      <ApolloProvider client={client}>
        <Header />
        {/* Rendér AdminNav, hvis der er tildelt en token */}
        {localStorage.token && <AdminNav />}
        <Switch>
          {/* Routes til offentligt tilgængeligt indhold */}
          <Route path="/" exact component={Textarea} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/scooters" exact component={Scooters} />
          <Route path="/showScooter/:id" exact component={ShowScooter} />
          <Route path="/chooseModel" exact component={ChooseModel} />
          <Route
            path="/chooseSubCategory/:id"
            exact
            component={ChooseSubCategory}
          />
          <Route
            path="/showSubCategory/:id"
            exact
            component={ShowSubCategory}
          />
          <Route path="/showSparepart/:id" exact component={ShowSparepart} />
          <Route path="/contact" exact component={Contact} />
          {/* Routes til adgangsbeskyttet indhold */}
          <Auth
            path="/welcome"
            render={() => (
              <Container className="contentWrapper">
                <Welcome />
                <MailLandingPage />
              </Container>
            )}
          />
          <Auth
            path="/mail/:id"
            render={() => (
              <Container className="contentWrapper">
                <Welcome />
                <Mail />
              </Container>
            )}
          />
          <Auth
            path="/editTextarea"
            render={() => (
              <Container className="contentWrapper">
                <EditTextarea />
              </Container>
            )}
          />
          <Auth
            path="/products"
            render={() => (
              <Container className="contentWrapper">
                <Products />
              </Container>
            )}
          />
          <Auth
            path="/editScooter/:id"
            render={() => (
              <Container className="contentWrapper">
                <GetScooterById />
              </Container>
            )}
          />
          <Auth
            path="/editSparepart/:id"
            render={() => (
              <Container className="contentWrapper">
                <GetSparepartById />
              </Container>
            )}
          />
          <Auth
            path="/addNewScooter"
            render={() => (
              <Container className="contentWrapper">
                <AddNewScooter />
              </Container>
            )}
          />
          <Auth
            path="/addNewSparepart"
            render={() => (
              <Container className="contentWrapper">
                <AddNewSparepart />
              </Container>
            )}
          />
          <Auth
            path="/addNewUser"
            render={() => (
              <Container className="contentWrapper">
                <AddNewUser />
              </Container>
            )}
          />
          <Auth
            path="/categories"
            render={() => (
              <Container className="contentWrapper">
                <Categories />
              </Container>
            )}
          />
          {/* Route til alle ugyldige stier */}
          <Route exact component={NotFound} />
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
