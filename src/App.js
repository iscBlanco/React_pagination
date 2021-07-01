import React from 'react'
import axios from 'axios'
import Posts from './components/Posts'
import Pagination from './components/Pagination'

export default function App() {
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [postPerPage] = React.useState(7)

  React.useEffect(()=>{
    const fetchPosts= async()=>{
      setLoading(true);
      const res= await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }

    fetchPosts();
  },[])

  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts
        posts={currentPosts}
        loading={loading}
      />
      <Pagination
        totalPosts={posts.length}
        postsPerPage={postPerPage}
        paginate={paginate}
      />
      <button className='btn btn-success'>click</button>
    </div>
  )
}

