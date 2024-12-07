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
  const [newsofEntertainments, setNewsEntertainments] = useState([]);
  const [newsofShorts, setNewsSports] = useState([]);
  const [newsofTechnologys, setNewsTechnologys] = useState([]);
  const [newsofLifes, setNewsLifes] = useState([]);

  const [popularArticles, setPopularArticles] = useState();
  const [newestArticles, setNewestArticles] = useState();
  const [isLogin, setIsLogin] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("isLogin") &&
      localStorage.getItem("isLogin") === "1"
    ) {
      const userToken = localStorage.getItem("user_access_token");
      const adminToken = localStorage.getItem("admin_access_token");
      setIsLogin(localStorage.getItem("isLogin"));
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(userToken || adminToken || "");
    }
  }, []);

  const handleClearStorage = () => {
    localStorage.clear("user_access_token");
    localStorage.clear("admin_access_token");
    localStorage.clear("user");
    localStorage.setItem("isLogin", 0);
    setIsLogin("0");
    setUser("");
    router.push("/");
  };

  const handleSetLogin = (user, token) => {
    setIsLogin("1");
    setUser(user);
    setToken(token);
  };

  const getAllArticles = async () => {
    try {
      const res = await axios.get(
        "https://api-school-amber.vercel.app/api/user-get-all"
      );
      if (res.status === 200) {
        setNews(res.data.listNews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularArticles = (articles) => {
    setPopularArticles([...articles].sort((a, b) => b.viewer - a.viewer));
  };

  const getNewestArticles = (articles) => {
    setNewestArticles(
      [...articles].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  };

  const handleSetSports = () => {
    const data = news.filter((ele) => ele.category === "កីឡា");
    if (data.length > 0) {
      setNewsSports(data);
    }
  };
  const handleSetEntertainments = () => {
    const data = news.filter((ele) => ele.category === "កម្សាន្ត");
    if (data.length > 0) {
      setNewsEntertainments(data);
    }
  };
  const handleSetTechnologys = () => {
    const data = news.filter((ele) => ele.category === "បច្ចេកវិ័ទ្យា");
    if (data.length > 0) {
      setNewsTechnologys(data);
    }
  };
  const handleSetLifes = () => {
    const data = news.filter((ele) => ele.category === "ជីវិតនិងសង្គម");
    if (data.length > 0) {
      setNewsLifes(data);
    }
  };

  useEffect(() => {
    getAllArticles();
    if (news) {
      getPopularArticles(news);
      getNewestArticles(news);
      handleSetSports();
      handleSetEntertainments();
      handleSetTechnologys();
      handleSetLifes();
    }
  }, [news]);

  return (
    <GlobalContext.Provider
      value={{
        isLogin,
        setIsLogin,
        handleClearStorage,
        handleSetLogin,
        token,
        user,
        setUser,
        isAuthModalOpen,
        openAuthModal,
        setAuthModalOpen,
        closeAuthModal,
        newestArticles,
        popularArticles,
        newsofLifes,
        news,
        newsofEntertainments,
        newsofShorts,
        newsofTechnologys,
        newsofLifes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for consuming the global state
export const useGlobalContext = () => useContext(GlobalContext);
