import { useEffect, useState } from "react";
import Leaderboard from "../components/Leaderboard";
import PlayingArea from "../components/PlayingArea";
import RecentScores from "../components/RecentScores";
import Avatar from "react-avatar";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../components/Sidebar"; 

export default function Game() {
    const [recentScore, setRecentScore] = useState(null);
    const [username, setUsername] = useState('');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://numquest.onrender.com/user', 
                {
                    headers: {
                        Authorization: token
                    },
                }
            );
            setUsername(response.data.username);
            setRecentScore(response.data.recentScores);
        } catch (err) {
            console.error(err);
        }
    };

    const onGameEnd = () => {
        fetchUser();
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    console.log(recentScore)
    return (
        <div className="h-screen w-screen overflow-hidden tracking-widest text-white bg-zinc-800 lg:p-16 flex lg:space-x-8">
            <div className="text-3xl font-semibold absolute p-2 lg:hidden cursor-pointer" onClick={toggleSidebar}>
                <GiHamburgerMenu />
            </div>
                <Sidebar
                    username={username}
                    recentScore={recentScore}
                    isVisible={isSidebarVisible}
                    onClose={toggleSidebar}
                />
            <div className={`lg:w-1/5 hidden lg:block `}>
                {recentScore && <RecentScores recentScore={recentScore} />}
                <div className="flex items-center space-x-2 lg:absolute lg:left-10 lg:bottom-10">
                    <Avatar name={username} size="45" className="rounded-full" />
                    <p>{username}</p>
                </div>
            </div>
            <PlayingArea onGameEnd={onGameEnd} />
            <div className="hidden lg:block w-1/5 my-8">
                <Leaderboard />
            </div>
        </div>
    );
}
