import axios from "axios";
const url = "/api/post";

export default class API {
  //register
  static async registerUser(user) {
    const res = await axios.post(`${url}/register`, user);
    return res.data;
  }
  //login
  static async loginUser(user) {
    const res = await axios.post(`${url}/login`, user);
    return res.data;
  }
  //logout
  static async logout() {
    const res = await axios.post(`${url}/logout`);
    return res.data;
  }
  //auth
  static async authUser() {
    const res = await axios.get(`${url}/auth/user`);
    return res.data;
  }
  // get all the post from the server
  static async getAllPost() {
    const res = await axios.get(url);
    return res.data;
  }
  // get post by id
  static async getPostById(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }
  // get post by category
  static async getPostByCategory(category) {
    const res = await axios.get(`${url}/category/${category}`);
    return res.data;
  }
  //add post
  static async addPost(post) {
    const res = await axios.post(`${url}`, post);
    return res.data;
  }
  //update post
  static async updatePost(id, post) {
    const res = await axios.patch(`${url}/${id}`, post);
    return res.data;
  }
  //delete post
  static async deletePost(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
}
