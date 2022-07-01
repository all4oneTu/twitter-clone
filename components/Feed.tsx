import { RefreshIcon } from "@heroicons/react/outline";
import React from "react";
import { Tweet } from "../typings";
import TweetComponent from "./Tweet";
import TweetBox from "./TweetBox";
import { fetchTweet } from "../utils/fetchTweet";
import toast from 'react-hot-toast'
interface Props {
  tweets: Tweet[];
}
function Feed({ tweets: tweetsProps }: Props) {
  const [tweets, setTweets] = React.useState<Tweet[]>(tweetsProps);
  console.log( tweets)
  const handleRefresh = async () => { 
    const refereshToast = toast.loading('Refreshing...' )
    const tweets = await fetchTweet();
    setTweets(tweets)
    toast.success('Feed Updated', {
      id: refereshToast,
    })
  }
  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
      <div className="flex items-center justify-between ">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon onClick={handleRefresh} className=" mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>
      <div>
        <TweetBox setTweets={setTweets } />
      </div>
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;

