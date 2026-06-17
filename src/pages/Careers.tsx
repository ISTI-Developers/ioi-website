import CareerList from "../components/layout/career/CareerList";




function Careers() {
    return (
        <div className="w-full text-white overflow-x-hidden px-6 md:px-12 lg:px-24 flex flex-col space-y-20">
            <img src="https://firebasestorage.googleapis.com/v0/b/innovation-one-4de73.firebasestorage.app/o/gif%2Fcareers.gif?alt=media&token=a40732da-dd73-48c7-940e-6649f0ae71cd" alt="Career Gif" className="w-250 mx-auto block mt-15" />

            <CareerList />
        </div>
    )
}


export default Careers;