import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });
//https://warm-brushlands-22534.herokuapp.com
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const fetchPost = (id)=>API.get(`/posts/api/post/${id}`);
export const createPost = (newPost) => API.post("/posts/api/newPost", newPost);
export const fetchPosts = (page) => API.get(`/posts/api/posts?page=${page}`);

export const signUp = (formData)=>API.post("/user/api/signup", formData);
export const signIn = (formData)=>API.post("/user/api/signin", formData);
export const verifyUser =(verifyData)=> API.post("/user/api/auth/verification/verify-account", verifyData);