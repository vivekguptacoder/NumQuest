import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('https://numquest.onrender.com/game/leaderboard', 
                    {
                        headers:{
                            Authorization: token
                        }
                    }
                )
                setLeaderboard(response.data);
            } catch (err) {
                console.error('Failed to fetch leaderboard', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <div className="bg-[#273b40] lg:block w-2/4 lg:w-full h-fit mx-auto rounded-3xl rounded-lg overflow-hidden">
                <p className="text-center font-semibold bg-gray-600 p-1">Leaderboard</p>
                <div className="p-2">
                    <p className="text-center font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#273b40] w-2/4 mx-auto lg:w-full h-fit rounded-3xl rounded-lg overflow-hidden">
            <p className="text-center font-semibold bg-gray-600 p-1">Leaderboard</p>
            <div className="p-2">
                {leaderboard.length > 0 ? (
                    leaderboard.map((entry, index) => (
                        <p key={index} className="border-b p-1 text-center font-medium">
                            {entry.username} <span className='bg-gray-600 p-1 rounded-full'>{entry.gamesWon}</span>
                        </p>
                    ))
                ) : (
                    <p className="text-center font-medium">No scores available</p>
                )}
            </div>
        </div>
    );
}
