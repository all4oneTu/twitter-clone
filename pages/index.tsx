import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import SideBar from '../components/SideBar'
import Widget from '../components/Widget'
import { Tweet } from '../typings'
import { fetchTweet } from '../utils/fetchTweet'
import {Toaster} from 'react-hot-toast'
interface Props{
  tweets : Tweet[]
}
const Home = ({ tweets }: Props) => {
  return (
    <div className="lg:max-w-6xl mx-auto overflow-hidden max-h-screen ">
      <Head>
        <title>Twitter Clone</title>
      </Head>
      <Toaster/>
      <main className="grid grid-cols-9">
        <SideBar />
        <Feed tweets={tweets}/>
        <Widget/>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => { 
  const tweets = await fetchTweet()
  return {
    props: {
      tweets,
    }
  }
}