import { useState } from 'react';
import Avatar from 'react-avatar';
import RecentScores from './RecentScores';
import Leaderboard from './Leaderboard';
import { IoClose } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import PropTypes from 'prop-types';  

export default function Sidebar({ username, recentScore, isVisible, onClose }) {

    const [activeSection, setActiveSection] = useState(null);

    return (
        <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:hidden w-full sm:w-1/2 md:w-1/3`}>
            {activeSection === 'recent' &&
                <>
                    <button onClick={() => {
                        setActiveSection(null)
                    }} className='p-4 text-3xl'><IoArrowBackCircle /></button>
                    <RecentScores recentScore={recentScore} />
                </>
            }  
            {activeSection === 'leaderboard' &&
                <>
                    <button onClick={() => {
                        setActiveSection(null)
                    }}
                    className='p-4 text-3xl'> <IoArrowBackCircle /></button>
                    <Leaderboard />
                </>
            }
            {activeSection === null &&
                <>
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <div className='flex items-center space-x-4 text-3xl'>
                            <Avatar name={username} size="45" className="rounded-full" />
                            <p>{username}</p>
                        </div>
                        <button onClick={onClose} className="text-2xl">
                            <IoClose />
                        </button>
                    </div>
                    <div className="p-4 flex flex-col items-start gap-2">
                        <button
                            onClick={() => setActiveSection('recent')}
                            className={`text-2xl p-1 border w-full rounded-md hover:opacity-75 ${activeSection === 'recent' ? 'bg-gray-700' : ''}`}
                        >
                            Recent Scores
                        </button>
                        <button
                            onClick={() => setActiveSection('leaderboard')}
                            className={`text-2xl p-1 border w-full rounded-md hover:opacity-75 ${activeSection === 'leaderboard' ? 'bg-gray-700' : ''}`}
                        >
                            Leaderboard
                        </button>
                    </div>
                </>
            }
        </div>
    );
}


Sidebar.propTypes = {
    username: PropTypes.string.isRequired,           
    recentScore: PropTypes.arrayOf(                  
        PropTypes.shape({
            id: PropTypes.number.isRequired,        
            score: PropTypes.number.isRequired,      
            date: PropTypes.string.isRequired        
        })
    ).isRequired,
    isVisible: PropTypes.bool.isRequired,           
    onClose: PropTypes.func.isRequired               
};
