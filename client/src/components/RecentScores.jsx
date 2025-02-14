import PropTypes from 'prop-types';

export default function RecentScores({ recentScore }) {
    return (
        <>
            <div className="bg-[#273b40] w-2/4 mx-auto my-8 md:w-3/4 lg:w-full h-fit rounded-3xl overflow-hidden">
                <p className="text-center font-semibold bg-gray-600 p-1">Recent Scores</p>
                <div className="p-2 flex flex-col-reverse">
                    {recentScore.map((rs, index) => (
                        <p key={index} className={`p-1 border-b text-center font-medium ${rs.result === `Lost` ? `text-red-600` : `text-green-600`}`}>
                            {rs.result}!
                        </p>
                    ))}
                </div>
            </div>
        </>
    )
}

RecentScores.propTypes = {
    recentScore: PropTypes.arrayOf(                    
        PropTypes.shape({
            result: PropTypes.string.isRequired       
        })
    ).isRequired
};
