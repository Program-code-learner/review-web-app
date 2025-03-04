// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Home from "./components/pages/Home";
// import Login from "./components/pages/Login";
// import Signup from "./components/pages/Signup";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import MovieDescription from "./components/pages/DetailPage";
// import { AuthProvider } from "./components/pages/AuthProvider";
// import { ProtectedRoute } from "./ProtectedRoute";
// import { PublicRoute } from "./PublicRoutes";

// function App() {
//   const queryClient = new QueryClient();
  
//   return (
//     <AuthProvider>
//       <QueryClientProvider client={queryClient}>
//         <Routes>
//           <Route 
//             path="/" 
//             element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             } 
//           />
//           <Route 
//             path="/signup" 
//             element={
//               <PublicRoute>
//                 <Signup />
//               </PublicRoute>
//             } 
//           />
//           <Route path="/movie/:id" element={<MovieDescription />} />
//           <Route
//             path="/home"
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </QueryClientProvider>
//     </AuthProvider>
//   );
// }

// export default App;




import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieDescription from "./components/pages/DetailPage";
import { AuthProvider } from "./components/pages/AuthProvider";

function App() {
  const queryClient = new QueryClient();
  
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:id" element={<MovieDescription />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
