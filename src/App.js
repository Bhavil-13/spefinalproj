import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
        // <Route path="/signup" element={<SignupComponent />} />
          <Route exact path="/" element={<SignupComponent />} />
          <Route exact path="/login" element={<LoginComponent />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="*" element={<ListEmployeeComponent />} />
          <Route path='/add-employee' element={<AddEmployeeComponent/>} />
          <Route path='/edit-employee/:id' element={<AddEmployeeComponent/>} />
          <Route path="/login" element={LoginComponent} />
        </Routes>
        {/* <ListEmployeeComponent /> */}
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;


// // App.js

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import FooterComponent from './components/FooterComponent';
// import HeaderComponent from './components/HeaderComponent';
// import ListEmployeeComponent from './components/ListEmployeeComponent';
// import AddEmployeeComponent from './components/AddEmployeeComponent';
// import LoginComponent from './components/LoginComponent';
// import SignupComponent from './components/SignupComponent';

// function App() {
//   return ( 
//     <div>
//       <Router>
//         <HeaderComponent />
//         <Routes>
//         <Route path="/signup" element={<SignupComponent />} />
//           <Route path="/login" element={<LoginComponent />} />
//           <Route path="/employees" element={<ListEmployeeComponent />} />
//           <Route path='/add-employee' element={<AddEmployeeComponent />} />
//           <Route path='/edit-employee/:id' element={<AddEmployeeComponent />} />
//           <Route path="*" element={<ListEmployeeComponent />} />
//         </Routes>
//         <FooterComponent />
//       </Router>
//     </div>
//   );
// }

// export default App;
