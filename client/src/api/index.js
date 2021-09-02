import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

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