import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Banner from '../components/Banner';
import { sanityClient, urlFor } from '../shourya';
import { Post } from '../typings';
import Link from 'next/link';

interface Props {
  // An aaray of type Post
  posts: [Post];
}


const Home: NextPage = ({ posts }: Props) => {
  
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Banner />

      {/* Posts */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {/* Go through every post. Each post will be a link */}
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='group border rounded-lg cursor-pointer overflow-hidden'>
              {post.mainImage && ( <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-400 ease-in-out rounded-lg' src={urlFor(post.mainImage).url()!} alt='' />)}

              <div className="flex justify-between p-5 bg-white"> 
      
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>{post.description} by {post.author.name}</p>
                </div>
                <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image).url()!} alt="" />
              </div>
                
            </div>
          </Link>
        ))}
      </div>


    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  // fetch info from Sanity
  const query = `*[_type == "post"]{
  _id,
  title,
  description,
  mainImage,
  slug,
  author -> {
    name,
    image
  }
}`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  };
};