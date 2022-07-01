import React from "react";
import {
  BellIcon,
  HomeIcon,
  SearchIcon,
  BookmarkIcon,
  UserIcon,
  CollectionIcon,
  DotsHorizontalIcon,
  HashtagIcon,
} from "@heroicons/react/outline";
import SideBarRow from "./SideBarRow";
import { useSession, signOut, signIn } from "next-auth/react";
function SideBar() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
      <img className="h-10 w-10" src="https://links.papareact.com/drq" alt="" />
      <SideBarRow Icon={HomeIcon} title="Home" />
      <SideBarRow Icon={SearchIcon} title="Search" />
      <SideBarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SideBarRow Icon={CollectionIcon} title="Lists" />
      <SideBarRow Icon={UserIcon} onClick={session ? signOut : signIn} title={session ? "Sign Out " : "Sign In"} />
      <SideBarRow Icon={DotsHorizontalIcon} title="More" />
    </div>
  );
}

export default SideBar;
