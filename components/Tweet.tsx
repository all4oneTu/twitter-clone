import React, { useEffect, useState } from "react";
import { Comment, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import { CommentBody } from "../.history/typings.d_20220630225735";
import toast from "react-hot-toast";
interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [comments, setComment] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const { data : session } = useSession()
  const [input, setInput] = useState<string>("")
  const refetchComment = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComment(comments);
  };
  useEffect(() => {
    refetchComment();
  }, []);
  
  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postComment()
    setInput("")
    setCommentBoxVisible(false)
  }
  const postComment = async () => { 
    const comment: CommentBody = {
      "comment": input,
      "username": session?.user?.name || "Unknown User",
      "profileImg": session?.user?.image || "http://links.papareact.com/gll",
      "tweetId" : tweet._id
    }
    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: "POST",
    })
    const json = await result.json()

    // const newTweets = await fetchTweet()
    // setTweets(newTweets)
    refetchComment()
    toast('Comment Add', {
      icon: '🚀'
    })
    return json;
  }
  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-3">
      <div className="flex space-x-3 ">
        <img
          className="ml-3 h-10 w-10 rounded-full object-cover"
          src={tweet.profileImage}
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-400 sm:inline">
              @{tweet.username}
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p className="pt-1">{tweet.title}</p>
          {tweet.image && (
            <img
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm w-full "
              src={tweet.image}
            />
          )}
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div
          onClick={() =>session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text" className="flex-1 rounded-lg bg-gray-100 p-2 outline-none" placeholder="Write a comment ..." />
          <button
            type="submit"

            disabled={!input}
            className="text-twitter disabled:text-gray-200">Post</button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t boder-gray-100 p-5 scrollbar-hide ">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2 ">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30 " />
              <img
                src={comment.profileImg}
                className="mt-1 h-7 w-7 object-cover rounded-full   "
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden tex-sm text-gray-500 lg:inline">
                    @{tweet.username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                  <TimeAgo
                    date={comment._createdAt}
                    className="text-sm text-gray-500"
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
