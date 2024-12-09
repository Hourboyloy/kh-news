// "use client"; // Enable client-side rendering for context

// import { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// // Create the context
// const GlobalContext = createContext();

// // Provider component
// export const GlobalProvider = ({ children }) => {
//   const router = useRouter();
//   const [news, setNews] = useState([]);
//   const [newsofEntertainments, setNewsEntertainments] = useState([]);
//   const [newsofShorts, setNewsSports] = useState([]);
//   const [newsofTechnologys, setNewsTechnologys] = useState([]);
//   const [newsofLifes, setNewsLifes] = useState([]);
//   const [isLoading,setLoading] = useState({slide:true,entertainment:true,sport:true,life:true})

//   const [popularArticles, setPopularArticles] = useState();
//   const [newestArticles, setNewestArticles] = useState();
//   const [isLogin, setIsLogin] = useState();
//   const [user, setUser] = useState();
//   const [token, setToken] = useState();
//   const [isAuthModalOpen, setAuthModalOpen] = useState(false);

//   const openAuthModal = () => setAuthModalOpen(true);
//   const closeAuthModal = () => setAuthModalOpen(false);

//   useEffect(() => {
//     if (
//       typeof window !== "undefined" &&
//       localStorage.getItem("isLogin") &&
//       localStorage.getItem("isLogin") === "1"
//     ) {
//       const userToken = localStorage.getItem("user_access_token");
//       const adminToken = localStorage.getItem("admin_access_token");
//       setIsLogin(localStorage.getItem("isLogin"));
//       setUser(JSON.parse(localStorage.getItem("user")));
//       setToken(userToken || adminToken || "");
//     }
//   }, []);

//   const handleClearStorage = () => {
//     localStorage.clear("user_access_token");
//     localStorage.clear("admin_access_token");
//     localStorage.clear("user");
//     localStorage.setItem("isLogin", 0);
//     setIsLogin("0");
//     setUser("");
//     router.push("/");
//   };

//   const handleSetLogin = (user, token) => {
//     setIsLogin("1");
//     setUser(user);
//     setToken(token);
//   };

//   const getAllArticles = async () => {
//     try {
//       const res = await axios.get(
//         "https://api-school-amber.vercel.app/api/user-get-all"
//       );
//       if (res.status === 200) {
//         setNews(res.data.listNews);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getPopularArticles = (articles) => {
//     setPopularArticles([...articles].sort((a, b) => b.viewer - a.viewer));
//   };

//   const getNewestArticles = (articles) => {
//     setNewestArticles(
//       [...articles].sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       )
//     );
//   };

//   const handleSetSports = () => {
//     const data = news.filter((ele) => ele.category === "កីឡា");
//     if (data.length > 0) {
//       setNewsSports(data);
//     }
//     if(data){
//       setLoading((prevState) => ({
//         ...prevState,
//         sport: false, // Example: Setting entertainment to false
//       }));
//     }
//   };
//   const handleSetEntertainments = () => {
//     const data = news.filter((ele) => ele.category === "កម្សាន្ត");
//     if (data.length > 0) {
//       setNewsEntertainments(data);
//     }
//     if (data) {
//       setLoading((prevState) => ({
//         ...prevState,
//         entertainment: false, // Example: Setting entertainment to false
//       }));
//     }
//   };
//   const handleSetTechnologys = () => {
//     const data = news.filter((ele) => ele.category === "បច្ចេកវិ័ទ្យា");
//     if (data.length > 0) {
//       setNewsTechnologys(data);
//     }
//   };
//   const handleSetLifes = () => {
//     const data = news.filter((ele) => ele.category === "ជីវិតនិងសង្គម");
//     if (data.length > 0) {
//       setNewsLifes(data);
//     }
//     if (data) {
//       setLoading((prevState) => ({
//         ...prevState,
//         life: false, // Example: Setting entertainment to false
//       }));
//     }
//   };

//   useEffect(() => {
//     getAllArticles();
//     if (news) {
//       setLoading(false)
//       getPopularArticles(news);
//       getNewestArticles(news);
//       handleSetSports();
//       handleSetEntertainments();
//       handleSetTechnologys();
//       handleSetLifes();
//     }
//   }, [news]);

//   return (
//     <GlobalContext.Provider
//       value={{
//         isLoading,
//         isLogin,
//         setIsLogin,
//         handleClearStorage,
//         handleSetLogin,
//         token,
//         user,
//         setUser,
//         isAuthModalOpen,
//         openAuthModal,
//         setAuthModalOpen,
//         closeAuthModal,
//         newestArticles,
//         popularArticles,
//         newsofLifes,
//         news,
//         newsofEntertainments,
//         newsofShorts,
//         newsofTechnologys,
//         newsofLifes,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// // Custom hook for consuming the global state
// export const useGlobalContext = () => useContext(GlobalContext);





// "use client"; // Enable client-side rendering for context

// import { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// // Create the context
// const GlobalContext = createContext();

// // Provider component
// export const GlobalProvider = ({ children }) => {
//   const router = useRouter();
//   const [news, setNews] = useState([]);
//   const [newsByCategory, setNewsByCategory] = useState({
//     entertainment: [],
//     sports: [],
//     technology: [],
//     life: [],
//   });
//   const [isLoading, setLoading] = useState({
//     slide: true,
//     entertainment: true,
//     sport: true,
//     life: true,
//   });
//   const [popularArticles, setPopularArticles] = useState([]);
//   const [newestArticles, setNewestArticles] = useState([]);
//   const [isLogin, setIsLogin] = useState(false);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [isAuthModalOpen, setAuthModalOpen] = useState(false);

//   const openAuthModal = () => setAuthModalOpen(true);
//   const closeAuthModal = () => setAuthModalOpen(false);

//   // Handle login logic
//   useEffect(() => {
//     const newslocal = localStorage.getItem("news")
//     const loginStatus = localStorage.getItem("isLogin");
//     if (loginStatus === "1") {
//       const userToken =
//         localStorage.getItem("user_access_token") ||
//         localStorage.getItem("admin_access_token");
//       const userData = JSON.parse(localStorage.getItem("user"));
//       setIsLogin(true);
//       setUser(userData);
//       setToken(userToken);
//     }
//     if (newslocal?.length > 0) {
//       setNews(newslocal);
//     }
//   }, []);

//   const handleClearStorage = () => {
//     localStorage.clear();
//     setIsLogin(false);
//     setUser(null);
//     setToken(null);
//     router.push("/");
//   };

//   const handleSetLogin = (user, token) => {
//     setIsLogin(true);
//     setUser(user);
//     setToken(token);
//   };

//   // Fetch all articles from the API
//   const getAllArticles = async () => {
//     try {
//       const res = await axios.get(
//         "https://api-school-amber.vercel.app/api/user-get-all"
//       );
//       if (res.status === 200) {
//         setNews(res.data.listNews);
//          localStorage.setItem("news", JSON.stringify(res.data.listNews));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Sort articles by viewer count and createdAt
//   const getPopularArticles = (articles) => {
//     setPopularArticles(articles.sort((a, b) => b.viewer - a.viewer));
//   };

//   const getNewestArticles = (articles) => {
//     setNewestArticles(
//       articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     );
//   };

//   // Categorize articles by category
//   const categorizeArticles = (articles) => {
//     const categorized = {
//       entertainment: articles.filter((ele) => ele.category === "កម្សាន្ត"),
//       sports: articles.filter((ele) => ele.category === "កីឡា"),
//       technology: articles.filter((ele) => ele.category === "បច្ចេកវិទ្យា"),
//       life: articles.filter((ele) => ele.category === "ជីវិតនិងសង្គម"),
//     };

//     setNewsByCategory(categorized);

//     // Set loading state to false for each category once the data is ready
//     setLoading((prevState) => ({
//       ...prevState,
//       entertainment: false,
//       sport: false,
//       technology: false,
//       life: false,
//     }));
//   };

//   // Fetch articles on initial load
//   useEffect(() => {
//     getAllArticles();
//   }, []);

//   // Once news data is available, process it
//   useEffect(() => {
//     if (news.length > 0) {
//       getPopularArticles(news);
//       getNewestArticles(news);
//       categorizeArticles(news);
//     }
//   }, [news]);

//   return (
//     <GlobalContext.Provider
//       value={{
//         isLoading,
//         isLogin,
//         setIsLogin,
//         handleClearStorage,
//         handleSetLogin,
//         token,
//         user,
//         setUser,
//         isAuthModalOpen,
//         openAuthModal,
//         closeAuthModal,
//         newestArticles,
//         popularArticles,
//         newsByCategory,
//         news,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// // Custom hook for consuming the global state
// export const useGlobalContext = () => useContext(GlobalContext);








"use client"; // Enable client-side rendering for context

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Create the context
const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [newsByCategory, setNewsByCategory] = useState({
    entertainment: [],
    sports: [],
    technology: [],
    life: [],
  });
  const [isLoading, setLoading] = useState({
    slide: true,
    entertainment: true,
    sport: true,
    life: true,
  });
  const [popularArticles, setPopularArticles] = useState([]);
  const [newestArticles, setNewestArticles] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  // Handle login logic
  useEffect(() => {
    const newslocal = localStorage.getItem("news");
    const loginStatus = localStorage.getItem("isLogin");
    if (loginStatus === "1") {
      const userToken =
        localStorage.getItem("user_access_token") ||
        localStorage.getItem("admin_access_token");
      const userData = JSON.parse(localStorage.getItem("user"));
      setIsLogin(true);
      setUser(userData);
      setToken(userToken);
    }
    if (newslocal?.length > 0) {
      setNews(JSON.parse(newslocal));
    }
  }, []);

  const handleClearStorage = () => {
    localStorage.clear();
    setIsLogin(false);
    setUser(null);
    setToken(null);
    router.push("/");
  };

  const handleSetLogin = (user, token) => {
    setIsLogin(true);
    setUser(user);
    setToken(token);
  };

  // Fetch all articles from the API
  const getAllArticles = async () => {
    try {
      const res = await axios.get(
        "https://api-news-dot-school.vercel.app/api/user-get-all"
      );
      if (res.status === 200) {
        setNews(res.data.listNews);
        localStorage.setItem("news", JSON.stringify(res.data.listNews));
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Sort articles by viewer count and createdAt
  const getPopularArticles = (articles) => {
    const sortedArticles = [...articles].sort((a, b) => b.viewer - a.viewer);
    setPopularArticles(sortedArticles);
  };

  const getNewestArticles = (articles) => {
    const sortedArticles = [...articles].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setNewestArticles(sortedArticles);
  };

  // Categorize articles by category
  const categorizeArticles = (articles) => {
    const categorized = {
      entertainment: articles.filter((ele) => ele.category === "កម្សាន្ត"),
      sports: articles.filter((ele) => ele.category === "កីឡា"),
      technology: articles.filter((ele) => ele.category === "បច្ចេកវិទ្យា"),
      life: articles.filter((ele) => ele.category === "ជីវិតនិងសង្គម"),
    };

    setNewsByCategory(categorized);

    // Set loading state to false for each category once the data is ready
    setLoading((prevState) => ({
      ...prevState,
      entertainment: false,
      sport: false,
      technology: false,
      life: false,
    }));
  };

  // Fetch articles on initial load
  useEffect(() => {
    getAllArticles();
  }, []);

  // Once news data is available, process it
  useEffect(() => {
    if (news.length > 0) {
      getPopularArticles(news);
      getNewestArticles(news);
      categorizeArticles(news);
    }
  }, [news]);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLogin,
        setIsLogin,
        handleClearStorage,
        handleSetLogin,
        token,
        user,
        setUser,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        newestArticles,
        popularArticles,
        newsByCategory,
        news,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for consuming the global state
export const useGlobalContext = () => useContext(GlobalContext);
