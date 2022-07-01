import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { Tweet, TweetBody } from "../typings";
import { fetchTweet } from "../utils/fetchTweet";
import toast from "react-hot-toast";
interface Props {
  setTweets :  Dispatch<React.SetStateAction<Tweet[]>>
}
function TweetBox({ setTweets } : Props) {
  const [inputTweet, setInputTweet] = useState<string>("");
  const [image, setImageUrl] = useState("");
  const { data: session } = useSession();
  const [isImageBoxOpen, setIsImageBoxOpen] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;
    try {
      console.log(imageInputRef.current?.value)
      setImageUrl(imageInputRef.current.value);
    }
    catch (erro) {
      console.log(erro)
    }
    console.log(image)
    imageInputRef.current.value = "";
    setIsImageBoxOpen(false);
  };
  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      "title": inputTweet,
      "username": session?.user?.name || "Unknown User", 
      "profileImage": session?.user?.image || "http://links.papareact.com/gll",
      "image" : image,
    }
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    })
    const json = await result.json()

    const newTweets = await fetchTweet()
    setTweets(newTweets)
    toast('Tweet Posted', {
      icon: '🚀'
    })
    return json;

  }
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
    e.preventDefault();
    postTweet()
    setInputTweet("");   
    setImageUrl("");
    setIsImageBoxOpen(false)
  }
  return (
    <div className="flex spacec-x-2 p-5">
      <img
        className="h-14 w-14 object-cover rounded-full mt-4 "
        src={session?.user?.image || "http://links.papareact.com/gll"}
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={inputTweet}
            type="text"
            placeholder="What's Happening"
            className="h-20 outline-none w-full text-xl placeholder:text-xl"
            onChange={(e) => setInputTweet(e.target.value)}
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setIsImageBoxOpen(!isImageBoxOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!inputTweet || !session}
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {isImageBoxOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                type="text"
                placeholder="Enter Image Url"
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}
          {image && (
            console.log(image),
            <img
              src={image}
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
